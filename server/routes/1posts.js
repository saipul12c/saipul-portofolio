const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const { body, query, validationResult } = require('express-validator');
const xml = require('xml');

const router = express.Router();
const POSTS_FILE = path.join(__dirname, '..', 'data', 'posts.json');

// Helper: baca & tulis
async function readPosts() {
  try {
    const data = await fs.readFile(POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}
async function writePosts(posts) {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Middleware: cek login
function requireAuth(req, res, next) {
  if (!req.session.username) {
    return res.status(401).json({ error: 'Harus login terlebih dahulu' });
  }
  next();
}

// Middleware: handle validation errors
function handleValidation(req, res, next) {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }
  next();
}

// Util: hanya ambil yang sudah dipublikasikan dan tidak dihapus
function filterPublished(posts) {
  const now = new Date();
  return posts.filter(p =>
    !p.isDeleted &&
    p.status === 'published' &&
    (!p.publishAt || new Date(p.publishAt) <= now)
  );
}

// Util: hitung readingTime (wpm ~200)
function calcReadingTime(text) {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ——— ROUTES ——— //

// 1) LIST & SEARCH POSTS
router.get(
  '/',
  [
    query('type').optional().isIn(['blog','news']),
    query('category').optional().isString(),
    query('tag').optional().isString(),
    query('author').optional().isString(),
    query('search').optional().isString(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('sortBy').optional().isIn(['createdAt','updatedAt','views','likesCount','readingTime']),
    query('order').optional().isIn(['asc','desc'])
  ],
  handleValidation,
  async (req, res) => {
    let posts = await readPosts();
    posts = filterPublished(posts);

    const {
      type, category, tag, author,
      search, page = 1, limit = 10,
      sortBy = 'createdAt', order = 'desc'
    } = req.query;

    if (type)      posts = posts.filter(p => p.type === type);
    if (category)  posts = posts.filter(p => (p.categories||[]).includes(category));
    if (tag)       posts = posts.filter(p => (p.tags||[]).includes(tag));
    if (author)    posts = posts.filter(p => p.author === author);
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      );
    }

    posts.forEach(p => {
      p.likesCount = (p.likes||[]).length;
      p.readingTime = calcReadingTime(p.content);
    });

    posts.sort((a,b) => {
      const aV = a[sortBy] || 0;
      const bV = b[sortBy] || 0;
      if (aV < bV) return order==='asc' ? -1 : 1;
      if (aV > bV) return order==='asc' ? 1 : -1;
      return 0;
    });

    const total = posts.length;
    const start = (page-1)*limit;
    const data = posts.slice(start, start + Number(limit));

    res.json({ total, page: Number(page), limit: Number(limit), data });
  }
);

// 2) GET SINGLE POST BY SLUG (increment views, access control)
router.get('/:slug', async (req, res) => {
  const posts = await readPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post || post.isDeleted) return res.status(404).json({ error: 'Post tidak ditemukan' });

  if (post.status !== 'published' ||
      (post.publishAt && new Date(post.publishAt) > new Date())) {
    if (!req.session.username || req.session.username !== post.author) {
      return res.status(403).json({ error: 'Post belum dipublikasikan' });
    }
  }

  post.views = (post.views||0) + 1;
  await writePosts(posts);

  post.likesCount  = (post.likes||[]).length;
  post.readingTime = calcReadingTime(post.content);
  res.json(post);
});

// 3) GET ALL POSTS MILEK USER (ALL STATUS)
router.get('/user/mine/all', requireAuth, async (req, res) => {
  const posts = await readPosts();
  res.json(posts.filter(p => p.author === req.session.username));
});

// 4) SOFT DELETE, RESTORE & TRASH
router.delete('/:id', requireAuth, async (req, res) => {
  const posts = await readPosts();
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error:'Post tidak ditemukan' });
  const post = posts[idx];
  if (post.author !== req.session.username) {
    return res.status(403).json({ error:'Hanya author yang bisa menghapus post ini' });
  }
  post.isDeleted = true;
  post.deletedAt = new Date().toISOString();
  await writePosts(posts);
  res.json({ message:'Post dipindahkan ke trash', postId: post.id });
});
router.post('/:id/restore', requireAuth, async (req, res) => {
  const posts = await readPosts();
  const post = posts.find(p=>p.id===req.params.id && p.isDeleted);
  if (!post) return res.status(404).json({ error:'Post trash tidak ditemukan' });
  if (post.author !== req.session.username) {
    return res.status(403).json({ error:'Hanya author yang bisa merestore post ini' });
  }
  post.isDeleted = false;
  delete post.deletedAt;
  await writePosts(posts);
  res.json({ message:'Post berhasil dipulihkan', post });
});
router.get('/user/trash', requireAuth, async (req, res) => {
  const posts = await readPosts();
  res.json(posts.filter(p=>p.author===req.session.username && p.isDeleted));
});

// 5) BOOKMARKS (session-based)
router.post('/:id/bookmark', requireAuth, async (req, res) => {
  req.session.bookmarks = req.session.bookmarks||[];
  if (!req.session.bookmarks.includes(req.params.id)) {
    req.session.bookmarks.push(req.params.id);
  }
  res.json({ bookmarks: req.session.bookmarks });
});
router.delete('/:id/bookmark', requireAuth, async (req, res) => {
  req.session.bookmarks = req.session.bookmarks||[];
  req.session.bookmarks = req.session.bookmarks.filter(id=>id!==req.params.id);
  res.json({ bookmarks: req.session.bookmarks });
});
router.get('/user/bookmarks', requireAuth, async (req, res) => {
  const posts = await readPosts();
  const marks = (req.session.bookmarks||[]).map(id => posts.find(p=>p.id===id)).filter(Boolean);
  res.json(marks);
});

// 6) CREATE POST (dengan all fitur: draft/scheduled, slug, summary, categories, tags, featuredImage, source, pin, history)
router.post(
  '/',
  requireAuth,
  [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    body('type').isIn(['blog','news']),
    body('categories').optional().isArray(),
    body('tags').optional().isArray(),
    body('featuredImage').optional().isString().isURL(),
    body('source').if(body('type').equals('news')).isString().notEmpty(),
    body('status').optional().isIn(['draft','published']),
    body('publishAt').optional().isISO8601()
  ],
  handleValidation,
  async (req, res) => {
    const now = new Date().toISOString();
    const {
      title, content, type,
      categories = [], tags = [],
      featuredImage = null, source = null,
      status = 'published', publishAt = null
    } = req.body;

    const newPost = {
      id: uuidv4(),
      slug: slugify(title, { lower:true, strict:true }),
      type,
      title,
      content,
      summary: content.slice(0,200) + (content.length>200?'…':''),
      categories,
      tags,
      featuredImage,
      source,
      author: req.session.username,
      status,
      publishAt,
      isPinned: false,
      isDeleted: false,
      views: 0,
      likes: [],
      comments: [],
      history: [],
      createdAt: now,
      updatedAt: now
    };

    const posts = await readPosts();
    posts.unshift(newPost);
    await writePosts(posts);
    res.status(201).json(newPost);
  }
);

// 7) UPDATE POST (dengan revision history & pin/unpin)
router.put(
  '/:id',
  requireAuth,
  [
    body('title').optional().isString(), body('content').optional().isString(),
    body('categories').optional().isArray(), body('tags').optional().isArray(),
    body('featuredImage').optional().isString().isURL(), body('source').optional().isString(),
    body('status').optional().isIn(['draft','published']), body('publishAt').optional().isISO8601(),
    body('isPinned').optional().isBoolean()
  ],
  handleValidation,
  async (req, res) => {
    const posts = await readPosts();
    const idx = posts.findIndex(p=>p.id===req.params.id);
    if (idx===-1) return res.status(404).json({ error:'Post tidak ditemukan' });
    const post = posts[idx];
    if (post.author !== req.session.username) {
      return res.status(403).json({ error:'Hanya author yang bisa mengubah post ini' });
    }

    // simpan snapshot di history
    post.history.push({
      title: post.title,
      content: post.content,
      tags: [...post.tags],
      categories: [...post.categories],
      updatedAt: post.updatedAt
    });

    const upd = req.body;
    if (upd.title) {
      post.title = upd.title;
      post.slug = slugify(upd.title, { lower:true, strict:true });
      post.summary = (upd.content||post.content).slice(0,200) + ((upd.content||post.content).length>200?'…':'');
    }
    if (upd.content) post.content = upd.content;
    if (upd.categories) post.categories = upd.categories;
    if (upd.tags) post.tags = upd.tags;
    if (upd.featuredImage !== undefined) post.featuredImage = upd.featuredImage;
    if (upd.source) post.source = upd.source;
    if (upd.status) post.status = upd.status;
    if (upd.publishAt !== undefined) post.publishAt = upd.publishAt;
    if (upd.isPinned !== undefined) post.isPinned = upd.isPinned;
    post.updatedAt = new Date().toISOString();

    posts[idx] = post;
    await writePosts(posts);
    res.json(post);
  }
);

// 8) COMMENTS (create, update, delete, list with pagination)
router.post(
  '/:id/comment',
  requireAuth,
  [ body('text').isString().notEmpty() ],
  handleValidation,
  async (req, res) => {
    const posts = await readPosts();
    const post = posts.find(p=>p.id===req.params.id);
    if (!post) return res.status(404).json({ error:'Post tidak ditemukan' });
    const comment = {
      id: uuidv4(),
      author: req.session.username,
      text: req.body.text,
      createdAt: new Date().toISOString()
    };
    post.comments.push(comment);
    await writePosts(posts);
    res.status(201).json(comment);
  }
);
router.get(
  '/:id/comments',
  [
    query('page').optional().isInt({ min:1 }), query('limit').optional().isInt({ min:1, max:100 })
  ],
  handleValidation,
  async (req, res) => {
    const { page=1, limit=10 } = req.query;
    const posts = await readPosts();
    const post = posts.find(p=>p.id===req.params.id);
    if (!post) return res.status(404).json({ error:'Post tidak ditemukan' });
    const comments = post.comments || [];
    const total = comments.length;
    const start = (page-1)*limit;
    const data = comments.slice(start, start + Number(limit));
    res.json({ total, page: Number(page), limit: Number(limit), data });
  }
);
router.put(
  '/:postId/comment/:commentId',
  requireAuth,
  [ body('text').isString().notEmpty() ],
  handleValidation,
  async (req, res) => {
    const posts = await readPosts();
    const post = posts.find(p=>p.id===req.params.postId);
    if (!post) return res.status(404).json({ error:'Post tidak ditemukan' });
    const idx = post.comments.findIndex(c=>c.id===req.params.commentId);
    if (idx===-1) return res.status(404).json({ error:'Komentar tidak ditemukan' });
    const c = post.comments[idx];
    if (c.author !== req.session.username) {
      return res.status(403).json({ error:'Hanya author komentar yang bisa mengubah ini' });
    }
    c.text = req.body.text;
    c.updatedAt = new Date().toISOString();
    post.comments[idx] = c;
    await writePosts(posts);
    res.json(c);
  }
);
router.delete('/:postId/comment/:commentId', requireAuth, async (req, res) => {
  const posts = await readPosts();
  const post = posts.find(p=>p.id===req.params.postId);
  if (!post) return res.status(404).json({ error:'Post tidak ditemukan' });
  const idx = post.comments.findIndex(c=>c.id===req.params.commentId);
  if (idx===-1) return res.status(404).json({ error:'Komentar tidak ditemukan' });
  const c = post.comments[idx];
  if (c.author !== req.session.username) {
    return res.status(403).json({ error:'Hanya author komentar yang bisa menghapus ini' });
  }
  post.comments.splice(idx,1);
  await writePosts(posts);
  res.json({ message:'Komentar berhasil dihapus' });
});

// 9) RELATED POSTS
router.get('/:id/related', async (req,res) => {
  const posts = await readPosts();
  const base = posts.find(p=>p.id===req.params.id);
  if (!base) return res.status(404).json({ error:'Post tidak ditemukan' });
  const pool = filterPublished(posts).filter(p=>p.id!==base.id);
  const scored = pool.map(p => {
    const commonCats = (p.categories||[]).filter(c=>base.categories.includes(c)).length;
    const commonTags = (p.tags||[]).filter(t=>base.tags.includes(t)).length;
    return { post: p, score: commonCats*2 + commonTags };
  }).filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,5)
    .map(item=>item.post);
  res.json(scored);
});

// 10) TAG CLOUD & ARCHIVE
router.get('/stats/tag-cloud', async (_req,res) => {
  const posts = filterPublished(await readPosts());
  const counts = {};
  posts.forEach(p=>{
    (p.tags||[]).forEach(t=> counts[t] = (counts[t]||0)+1);
    (p.categories||[]).forEach(c=> counts[c] = (counts[c]||0)+1);
  });
  res.json(counts);
});
router.get('/stats/archive', async (_req,res) => {
  const posts = filterPublished(await readPosts());
  const archive = {};
  posts.forEach(p=>{
    const d = new Date(p.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    archive[key] = (archive[key]||0) + 1;
  });
  res.json(archive);
});

// 11) POPULAR POSTS & OVERVIEW STATS
router.get(
  '/stats/popular',
  [
    query('by').optional().isIn(['views','likesCount','readingTime']),
    query('limit').optional().isInt({ min:1, max:50 })
  ],
  handleValidation,
  async (req,res) => {
    const { by = 'views', limit = 5 } = req.query;
    let posts = await readPosts();
    posts = filterPublished(posts);
    posts.forEach(p => {
      p.likesCount = (p.likes||[]).length;
      p.readingTime = calcReadingTime(p.content);
    });
    posts.sort((a,b) => b[by] - a[by]);
    res.json(posts.slice(0, Number(limit)));
  }
);
router.get('/stats/overview', async (_req,res) => {
  const posts = await readPosts();
  const published = filterPublished(posts);
  const totalPosts    = published.length;
  const totalComments = published.reduce((s,p) => s + (p.comments?.length||0), 0);
  const totalLikes    = published.reduce((s,p) => s + (p.likes?.length||0), 0);
  res.json({ totalPosts, totalComments, totalLikes });
});

// 12) RSS Feed & Sitemap
router.get('/feed/rss', async (_req,res) => {
  const posts = filterPublished(await readPosts()).slice(0,20);
  const items = posts.map(p => ({
    item: [
      { title: p.title },
      { link: `https://${_req.get('host')}/posts/${p.slug}` },
      { pubDate: p.createdAt },
      { description: p.summary }
    ]
  }));
  const feed = {
    rss: [
      { _attr: { version: '2.0' } },
      { channel: [
        { title: 'My Site Feed' },
        { link: `https://${_req.get('host')}/` },
        { description: 'Feed terbaru' },
        ...items
      ]}
    ]
  };
  res.type('application/xml').send(xml(feed));
});
router.get('/sitemap.xml', async (_req,res) => {
  const posts = filterPublished(await readPosts());
  const urls = posts.map(p => ({
    url: [
      { loc: `https://${_req.get('host')}/posts/${p.slug}` },
      { lastmod: p.updatedAt }
    ]
  }));
  const sm = { urlset: [{ _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } }, ...urls] };
  res.type('application/xml').send(xml(sm));
});

module.exports = router;
