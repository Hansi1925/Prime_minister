// const mongoose = require('mongoose');
// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// // MongoDB Connection
// const connectMongo = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//   }
// };

// // SQLite Connection (for local testing)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './local.sqlite',
// });

// sequelize.authenticate()
//   .then(() => console.log('SQLite Connected'))
//   .catch(err => console.error('SQLite connection error:', err));

// module.exports = { connectMongo, sequelize };


const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_PATH || path.join(__dirname, '../../var/data.sqlite'),
  logging: false
});

module.exports = sequelize;
