// File: utils/userUtils.js
const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

exports.PASSWORD_MIN_LENGTH = 8;
exports.MAX_LOGIN_ATTEMPTS = 5;
exports.LOCK_DURATION = 15 * 60 * 1000;       // 15 menit
exports.EMAIL_TOKEN_EXPIRY = 24 * 60 * 60 * 1000;  // 24 jam

exports.readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

exports.writeUsers = async (users) => {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
};

exports.sanitizeUser = (user) => {
  const { password, failedAttempts, lockedUntil, emailToken, emailTokenExpiry, ...safe } = user;
  return safe;
};
