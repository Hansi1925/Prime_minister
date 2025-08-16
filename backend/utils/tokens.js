const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models/Index.js');

const ACCESS_TTL_MIN = parseInt(process.env.ACCESS_TTL_MIN || '15', 10);
const REFRESH_TTL_DAYS = parseInt(process.env.REFRESH_TTL_DAYS || '7', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const signAccess = (user) =>
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: `${ACCESS_TTL_MIN}m` });

const verifyAccess = (token) => jwt.verify(token, JWT_SECRET);

const hashToken = (t) => crypto.createHash('sha256').update(t).digest('hex');

async function createRefreshToken(userId, replacingHash = null) {
  const token = crypto.randomBytes(64).toString('hex');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);

  await RefreshToken.create({ userId, tokenHash, expiresAt, revokedAt: null, replacedByTokenHash: null });

  if (replacingHash) {
    await RefreshToken.update(
      { revokedAt: new Date(), replacedByTokenHash: tokenHash },
      { where: { tokenHash: replacingHash } }
    );
  }
  return { token, tokenHash };
}

async function verifyRefreshToken(rawToken) {
  const tokenHash = hashToken(rawToken);
  const row = await RefreshToken.findOne({ where: { tokenHash } });
  if (!row) return { ok: false, reason: 'not_found' };
  if (row.revokedAt) return { ok: false, reason: 'revoked' };
  if (row.expiresAt < new Date()) return { ok: false, reason: 'expired' };
  return { ok: true, row };
}

async function revokeRefreshToken(rawToken) {
  const tokenHash = hashToken(rawToken);
  await RefreshToken.update({ revokedAt: new Date() }, { where: { tokenHash } });
}
async function revokeAllUserRefreshTokens(userId) {
  await RefreshToken.update({ revokedAt: new Date() }, { where: { userId, revokedAt: null } });
}

module.exports = {
  signAccess,
  verifyAccess,
  createRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserRefreshTokens
};
