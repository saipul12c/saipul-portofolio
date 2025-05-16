// handlers/bookmarks.js
const fs = require('fs').promises;
const path = require('path');
const POSTS_FILE = path.join(__dirname, '..', 'data', 'posts.json');

async function readPosts() {
  try {
    const data = await fs.readFile(POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// ADD BOOKMARK
exports.addBookmark = async (req, res) => {
  req.session.bookmarks = req.session.bookmarks||[];
  if (!req.session.bookmarks.includes(req.params.id)) {
    req.session.bookmarks.push(req.params.id);
  }
  res.json({ bookmarks: req.session.bookmarks });
};

// REMOVE BOOKMARK
exports.removeBookmark = async (req, res) => {
  req.session.bookmarks = req.session.bookmarks||[];
  req.session.bookmarks = req.session.bookmarks.filter(id=>id!==req.params.id);
  res.json({ bookmarks: req.session.bookmarks });
};

// LIST BOOKMARKS
exports.listBookmarks = async (req, res) => {
  const posts = await readPosts();
  const marks = (req.session.bookmarks||[])
    .map(id => posts.find(p=>p.id===id))
    .filter(Boolean);
  res.json(marks);
};
