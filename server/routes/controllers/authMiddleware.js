// File: middlewares/authMiddleware.js
const { validationResult } = require('express-validator');
const { readUsers } = require('../utils/userUtils');

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

exports.requireAuth = (req, res, next) => {
  if (!req.session.username) return res.status(401).json({ error: 'Harus login dahulu' });
  next();
};

exports.loadUser = async (req, res, next) => {
  try {
    const users = await readUsers();
    req.user = users.find(u => u.username === req.session.username) || null;
    next();
  } catch (err) {
    console.error('Error loadUser:', err);
    res.status(500).json({ error: 'Kesalahan server' });
  }
};

exports.requireVerified = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Harus login dahulu' });
  if (!req.user.isVerified) return res.status(403).json({ error: 'Email belum diverifikasi' });
  next();
};
