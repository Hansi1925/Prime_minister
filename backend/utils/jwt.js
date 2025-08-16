const jwt = require('jsonwebtoken');

const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '1d' });

const verify = (token) =>
  jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');

module.exports = { sign, verify };
