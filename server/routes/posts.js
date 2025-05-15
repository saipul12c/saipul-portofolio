const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const POSTS_FILE = path.join(__dirname, '..', 'data', 'posts.json');

// Helper baca & tulis
async function readPosts() {
  try {
    const data = await fs.readFile(POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}
async function writePosts(posts) {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Middleware cek login
function requireAuth(req, res, next) {
  if (!req.session.username) {
    return res.status(401).json({ error: 'Harus login terlebih dahulu' });
  }
  next();
}

// Ambil semua posts
router.get('/', async (req, res) => {
  const posts = await readPosts();
  res.json(posts);
});

// Ambil 1 post berdasarkan ID
router.get('/:id', async (req, res) => {
  const posts = await readPosts();
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post tidak ditemukan' });
  res.json(post);
});

// Buat post baru
router.post('/', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title dan content wajib diisi' });
  }
  const posts = await readPosts();
  const newPost = {
    id: uuidv4(),
    title,
    content,
    author: req.session.username,
    createdAt: new Date().toISOString()
  };
  posts.unshift(newPost);
  await writePosts(posts);
  res.status(201).json(newPost);
});

// Update post (hanya author)
router.put('/:id', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const posts = await readPosts();
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Post tidak ditemukan' });

  const post = posts[index];
  if (post.author !== req.session.username) {
    return res.status(403).json({ error: 'Hanya author yang bisa mengubah post ini' });
  }

  posts[index] = {
    ...post,
    title: title || post.title,
    content: content || post.content,
    updatedAt: new Date().toISOString()
  };
  await writePosts(posts);
  res.json(posts[index]);
});

// Hapus post (hanya author)
router.delete('/:id', requireAuth, async (req, res) => {
  const posts = await readPosts();
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Post tidak ditemukan' });

  const post = posts[index];
  if (post.author !== req.session.username) {
    return res.status(403).json({ error: 'Hanya author yang bisa menghapus post ini' });
  }

  const deleted = posts.splice(index, 1)[0];
  await writePosts(posts);
  res.json({ message: 'Post berhasil dihapus', deleted });
});

module.exports = router;
