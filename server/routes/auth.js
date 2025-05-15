const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

// Helper baca & tulis
async function readUsers() {
  const data = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(data);
}
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib diisi' });
  }
  const users = await readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username sudah terdaftar' });
  }
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });
  await writeUsers(users);
  req.session.username = username;
  res.json({ message: 'Registrasi berhasil' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Username/password salah' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Username/password salah' });
  }
  req.session.username = username;
  res.json({ message: 'Login berhasil' });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Gagal logout' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout berhasil' });
  });
});

module.exports = router;
