// handlers/postsCrud.js
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

const POSTS_FILE = path.join(__dirname, '..', '..', 'data', 'posts.json');
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

// CREATE POST
exports.createPost = async (req, res) => {
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
    type, title, content,
    summary: content.slice(0,200) + (content.length>200?'…':''), categories, tags,
    featuredImage, source, author: req.session.username,
    status, publishAt, isPinned: false,
    isDeleted: false, views: 0, likes: [], comments: [], history: [],
    createdAt: now, updatedAt: now
  };

  const posts = await readPosts();
  posts.unshift(newPost);
  await writePosts(posts);
  res.status(201).json(newPost);
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  const posts = await readPosts();
  const idx = posts.findIndex(p=>p.id===req.params.id);
  if (idx===-1) return res.status(404).json({ error:'Post tidak ditemukan' });
  const post = posts[idx];
  if (post.author !== req.session.username) {
    return res.status(403).json({ error:'Hanya author yang bisa mengubah post ini' });
  }

  // history snapshot
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
};

// SOFT DELETE
exports.softDeletePost = async (req, res) => {
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
};

// RESTORE
exports.restorePost = async (req, res) => {
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
};

// USER'S POSTS & TRASH
exports.userPosts = async (req, res) => {
  const posts = await readPosts();
  res.json(posts.filter(p => p.author === req.session.username));
};
exports.userTrash = async (req, res) => {
  const posts = await readPosts();
  res.json(posts.filter(p => p.author===req.session.username && p.isDeleted));
};
