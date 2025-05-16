// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

// Helper: baca & tulis file users.json
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // Jika file belum ada atau korup, kembalikan array kosong
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeUsers(users) {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
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

    // Simpan session
    req.session.username = username;

    return res.json({ message: 'Registrasi berhasil' });
  } catch (err) {
    console.error('Error di REGISTER:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server saat registrasi' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password wajib diisi' });
    }

    const users = await readUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }

    // Simpan session
    req.session.username = username;

    return res.json({ message: 'Login berhasil' });
  } catch (err) {
    console.error('Error di LOGIN:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server saat login' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error saat LOGOUT:', err);
      return res.status(500).json({ error: 'Gagal logout' });
    }
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logout berhasil' });
  });
});

module.exports = router;
