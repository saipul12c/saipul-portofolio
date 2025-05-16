// handlers/postsList.js
const fs = require('fs').promises;
const path = require('path');
const xml = require('xml');
const { calcReadingTime, filterPublished, readPosts, writePosts } = (() => {
  const POSTS_FILE = path.join(__dirname, '..', 'data', 'posts.json');
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
  function filterPublished(posts) {
    const now = new Date();
    return posts.filter(p =>
      !p.isDeleted &&
      p.status === 'published' &&
      (!p.publishAt || new Date(p.publishAt) <= now)
    );
  }
  function calcReadingTime(text) {
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }
  return { readPosts, writePosts, filterPublished, calcReadingTime };
})();

// 1) LIST & SEARCH POSTS
exports.listPosts = async (req, res) => {
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
  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    data: posts.slice(start, start + Number(limit))
  });
};

// 2) GET SINGLE POST BY SLUG
exports.getPostBySlug = async (req, res) => {
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
};

// 9) RELATED POSTS
exports.relatedPosts = async (req, res) => {
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
};

// 10) TAG CLOUD
exports.tagCloud = async (_req, res) => {
  const posts = filterPublished(await readPosts());
  const counts = {};
  posts.forEach(p=>{
    (p.tags||[]).forEach(t=> counts[t] = (counts[t]||0)+1);
    (p.categories||[]).forEach(c=> counts[c] = (counts[c]||0)+1);
  });
  res.json(counts);
};

// 10) ARCHIVE
exports.archive = async (_req, res) => {
  const posts = filterPublished(await readPosts());
  const archive = {};
  posts.forEach(p=>{
    const d = new Date(p.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    archive[key] = (archive[key]||0) + 1;
  });
  res.json(archive);
};

// 11) POPULAR POSTS
exports.popularPosts = async (req, res) => {
  const { by = 'views', limit = 5 } = req.query;
  let posts = filterPublished(await readPosts());
  posts.forEach(p => {
    p.likesCount = (p.likes||[]).length;
    p.readingTime = calcReadingTime(p.content);
  });
  posts.sort((a,b) => b[by] - a[by]);
  res.json(posts.slice(0, Number(limit)));
};

// 11) OVERVIEW STATS
exports.overviewStats = async (_req, res) => {
  const posts = filterPublished(await readPosts());
  const totalPosts    = posts.length;
  const totalComments = posts.reduce((s,p) => s + (p.comments?.length||0), 0);
  const totalLikes    = posts.reduce((s,p) => s + (p.likes?.length||0), 0);
  res.json({ totalPosts, totalComments, totalLikes });
};

// 12) RSS Feed
exports.rssFeed = async (_req, res) => {
  const host = _req.get('host');
  const posts = filterPublished(await readPosts()).slice(0,20);
  const items = posts.map(p=>({
    item: [
      { title: p.title },
      { link: `https://${host}/posts/${p.slug}` },
      { pubDate: p.createdAt },
      { description: p.summary }
    ]
  }));
  const feed = {
    rss: [
      { _attr: { version: '2.0' } },
      { channel: [
        { title: 'My Site Feed' },
        { link: `https://${host}/` },
        { description: 'Feed terbaru' },
        ...items
      ]}
    ]
  };
  res.type('application/xml').send(xml(feed));
};

// 12) SITEMAP
exports.sitemap = async (_req, res) => {
  const host = _req.get('host');
  const posts = filterPublished(await readPosts());
  const urls = posts.map(p=>({
    url: [
      { loc: `https://${host}/posts/${p.slug}` },
      { lastmod: p.updatedAt }
    ]
  }));
  const sm = { urlset: [{ _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } }, ...urls] };
  res.type('application/xml').send(xml(sm));
};
