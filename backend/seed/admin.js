require('dotenv').config();
const { sequelize, User } = require('../models/Index.js');
const { hash } = require('../utils/password.js');

(async () => {
  await sequelize.sync();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';

  let admin = await User.findOne({ where: { email } });
  if (!admin) {
    admin = await User.create({
      username,
      email,
      role: 'admin',
      passwordHash: await hash(password)
    });
    console.log('Created admin:', { email, password });
  } else {
    console.log('Admin exists:', email);
  }
  process.exit(0);
})();
