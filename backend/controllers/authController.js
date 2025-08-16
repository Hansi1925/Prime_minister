const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { User, PasswordResetToken } = require('../models/Index.js');
const { hash, compare } = require('../utils/password.js');
const {
  signAccess,
  createRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserRefreshTokens
} = require('../utils/tokens');

const RESET_TTL_MIN = parseInt(process.env.RESET_TTL_MIN || '30', 10);

// ---- validators
exports.validateRegister = [
  body('username').trim().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];
exports.validateLogin = [ body('email').isEmail(), body('password').notEmpty() ];
exports.validateRefresh = [ body('refreshToken').isString().notEmpty() ];
exports.validateLogout = [ body('refreshToken').optional().isString() ];
exports.validateRequestReset = [ body('email').isEmail() ];
exports.validateResetPassword = [ body('token').isString().notEmpty(), body('password').isLength({ min: 6 }) ];

// ---- basic auth
exports.register = async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({ username, email, passwordHash: await hash(password), role: 'user' });
    const accessToken = signAccess(user);
    const { token: refreshToken } = await createRefreshToken(user.id);

    res.status(201).json({ accessToken, refreshToken, user: { id: user.id, username, email, role: user.role } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.login = async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = signAccess(user);
    const { token: refreshToken } = await createRefreshToken(user.id);
    res.json({ accessToken, refreshToken, user: { id: user.id, username: user.username, email, role: user.role } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.me = async (req, res) => {
  const u = req.user;
  res.json({ id: u.id, username: u.username, email: u.email, role: u.role });
};

// ---- refresh & logout
exports.refresh = async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { refreshToken } = req.body;

  const verified = await verifyRefreshToken(refreshToken);
  if (!verified.ok) return res.status(401).json({ message: 'Invalid refresh token' });

  const old = verified.row;
  const user = await old.getUser();

  const { token: newRefreshToken } = await createRefreshToken(user.id, old.tokenHash);
  await revokeRefreshToken(refreshToken);

  const accessToken = signAccess(user);
  res.json({ accessToken, refreshToken: newRefreshToken });
};

exports.logout = async (req, res) => {
  const { refreshToken, allDevices } = req.body || {};
  try {
    if (allDevices && req.user) await revokeAllUserRefreshTokens(req.user.id);
    else if (refreshToken) await revokeRefreshToken(refreshToken);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ---- password reset
exports.requestReset = async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ ok: true }); // privacy

    const raw = crypto.randomBytes(48).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(raw).digest('hex');
    const expiresAt = new Date(Date.now() + RESET_TTL_MIN * 60 * 1000);
    await PasswordResetToken.create({ userId: user.id, tokenHash, expiresAt, usedAt: null });

    // TODO: email raw token link; return for dev use
    res.json({ ok: true, resetToken: raw, expiresAt });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.resetPassword = async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { token, password } = req.body;

  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const row = await PasswordResetToken.findOne({ where: { tokenHash } });
    if (!row) return res.status(400).json({ message: 'Invalid token' });
    if (row.usedAt) return res.status(400).json({ message: 'Token already used' });
    if (row.expiresAt < new Date()) return res.status(400).json({ message: 'Token expired' });

    const user = await row.getUser();
    await user.update({ passwordHash: await hash(password) });
    await row.update({ usedAt: new Date() });
    await revokeAllUserRefreshTokens(user.id);

    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
};



// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Generate JWT
// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// // Register
// exports.register = async (req, res) => {
//   const { username, email, password, role } = req.body;
//   try {
//     const user = await User.create({ username, email, password, role });
//     res.status(201).json({ token: generateToken(user._id), user });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     res.json({ token: generateToken(user._id), user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get current user
// exports.getCurrentUser = async (req, res) => {
//   res.json(req.user);
// };
