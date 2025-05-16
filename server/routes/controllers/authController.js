// File: controllers/authController.js
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {
  readUsers,
  writeUsers,
  sanitizeUser,
  PASSWORD_MIN_LENGTH,
  EMAIL_TOKEN_EXPIRY,
  MAX_LOGIN_ATTEMPTS,
  LOCK_DURATION
} = require('../utils/userUtils');

exports.register = async (req, res) => {
  try {
    const { username, email, password, name = '', avatarUrl = null, bio = '', phone = '', address = '', social = {} } = req.body;
    const users = await readUsers();

    if (users.some(u => u.username === username)) return res.status(409).json({ error: 'Username sudah terdaftar' });
    if (users.some(u => u.email === email)) return res.status(409).json({ error: 'Email sudah terdaftar' });

    const hash = await bcrypt.hash(password, 12);
    const emailToken = crypto.randomBytes(32).toString('hex');
    const now = new Date().toISOString();

    const newUser = {
      username,
      email,
      password: hash,
      name,
      avatarUrl,
      bio,
      phone,
      address,
      social: {
        twitter: social.twitter || '',
        linkedin: social.linkedin || ''
      },
      createdAt: now,
      updatedAt: now,
      lastLogin: null,
      failedAttempts: 0,
      lockedUntil: null,
      isVerified: false,
      emailToken,
      emailTokenExpiry: Date.now() + EMAIL_TOKEN_EXPIRY
    };

    users.push(newUser);
    await writeUsers(users);

    // TODO: Kirim email verifikasi
    req.session.username = username;
    res.status(201).json({ message: 'Registrasi berhasil, silakan verifikasi email', profile: sanitizeUser(newUser) });
  } catch (err) {
    console.error('Error REGISTER:', err);
    res.status(500).json({ error: 'Kesalahan server saat registrasi' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const users = await readUsers();
    const user = users.find(u => u.emailToken === token);

    if (!user) return res.status(400).json({ error: 'Token tidak valid' });
    if (Date.now() > user.emailTokenExpiry) return res.status(400).json({ error: 'Token kadaluarsa' });

    user.isVerified = true;
    user.emailToken = null;
    user.emailTokenExpiry = null;
    user.updatedAt = new Date().toISOString();
    await writeUsers(users);

    res.json({ message: 'Email berhasil diverifikasi' });
  } catch (err) {
    console.error('Error VERIFY EMAIL:', err);
    res.status(500).json({ error: 'Kesalahan server saat verifikasi email' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await readUsers();
    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).json({ error: 'Username atau password salah' });
    if (user.lockedUntil && Date.now() < user.lockedUntil) {
      return res.status(403).json({ error: `Akun terkunci hingga ${new Date(user.lockedUntil).toLocaleString()}` });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      user.failedAttempts++;
      if (user.failedAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockedUntil = Date.now() + LOCK_DURATION;
        user.failedAttempts = 0;
      }
      await writeUsers(users);
      return res.status(401).json({ error: 'Username atau password salah' });
    }

    user.failedAttempts = 0;
    user.lockedUntil = null;
    user.lastLogin = new Date().toISOString();
    await writeUsers(users);

    req.session.username = username;
    res.json({ message: 'Login berhasil', profile: sanitizeUser(user) });
  } catch (err) {
    console.error('Error LOGIN:', err);
    res.status(500).json({ error: 'Kesalahan server saat login' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error LOGOUT:', err);
      return res.status(500).json({ error: 'Gagal logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout berhasil' });
  });
};

exports.getProfile = (req, res) => {
  if (!req.user) return res.status(404).json({ error: 'User tidak ditemukan' });
  res.json({ profile: sanitizeUser(req.user) });
};

exports.updateProfile = async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.username === req.session.username);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    const { email, name, avatarUrl, bio, phone, address, social = {}, oldPassword, newPassword } = req.body;
    if (email && users.some(u => u.email === email && u.username !== user.username)) {
      return res.status(409).json({ error: 'Email sudah digunakan' });
    }
    if (oldPassword && newPassword) {
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) return res.status(401).json({ error: 'Password lama salah' });
      user.password = await bcrypt.hash(newPassword, 12);
    }

    if (email) user.email = email;
    if (name !== undefined) user.name = name;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
    if (bio !== undefined) user.bio = bio;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    user.social.twitter = social.twitter || user.social.twitter;
    user.social.linkedin = social.linkedin || user.social.linkedin;
    user.updatedAt = new Date().toISOString();

    await writeUsers(users);
    res.json({ message: 'Profile diperbarui', profile: sanitizeUser(user) });
  } catch (err) {
    console.error('Error UPDATE PROFILE:', err);
    res.status(500).json({ error: 'Kesalahan server saat memperbarui profile' });
  }
};
