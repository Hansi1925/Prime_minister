const { verifyAccess } = require('../utils/tokens.js');
const { User } = require('../models/Index.js');

module.exports = async function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = verifyAccess(token);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};



// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// require('dotenv').config();

// const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) return res.status(401).json({ message: 'Not authorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token invalid' });
//   }
// };

// module.exports = protect;
