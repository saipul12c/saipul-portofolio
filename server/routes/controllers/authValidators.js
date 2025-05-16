// File: validators/authValidators.js
const { body, param } = require('express-validator');
const { PASSWORD_MIN_LENGTH } = require('../utils/userUtils');

exports.registerRules = [
  body('username').isAlphanumeric().withMessage('Username hanya huruf dan angka').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: PASSWORD_MIN_LENGTH }).withMessage(`Password minimal ${PASSWORD_MIN_LENGTH} karakter`),
  body('confirmPassword').custom((v, { req }) => v === req.body.password).withMessage('Konfirmasi password tidak cocok'),
  body('name').optional().isString().trim(),
  body('avatarUrl').optional().isURL(),
  body('bio').optional().isLength({ max: 500 }),
  body('phone').optional().isMobilePhone(),
  body('address').optional().isString().trim(),
  body('social.twitter').optional().isURL(),
  body('social.linkedin').optional().isURL()
];

exports.verifyRules = [
  param('token').isHexadecimal().isLength({ min: 64, max: 64 }).withMessage('Token tidak valid')
];

exports.loginRules = [
  body('username').isString(),
  body('password').isString()
];

exports.updateRules = [
  body('email').optional().isEmail().normalizeEmail(),
  body('name').optional().isString().trim(),
  body('avatarUrl').optional().isURL(),
  body('bio').optional().isLength({ max: 500 }),
  body('phone').optional().isMobilePhone(),
  body('address').optional().isString().trim(),
  body('social.twitter').optional().isURL(),
  body('social.linkedin').optional().isURL(),
  body('oldPassword').optional().isString(),
  body('newPassword').optional().isLength({ min: PASSWORD_MIN_LENGTH }),
  body('confirmNewPassword').optional().custom((v, { req }) => v === req.body.newPassword)
];
