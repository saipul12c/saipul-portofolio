// handlers/comments.js
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
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

// CREATE COMMENT
exports.addComment = async (req, res) => {
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
};

// LIST COMMENTS
exports.listComments = async (req, res) => {
  const { page=1, limit=10 } = req.query;
  const posts = await readPosts();
  const post = posts.find(p=>p.id===req.params.id);
  if (!post) return res.status(404).json({ error:'Post tidak ditemukan' });
  const comments = post.comments || [];
  const total = comments.length;
  const start = (page-1)*limit;
  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    data: comments.slice(start, start + Number(limit))
  });
};

// UPDATE COMMENT
exports.updateComment = async (req, res) => {
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
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
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
};
