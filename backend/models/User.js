const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user' }
}, { tableName: 'users', timestamps: true });

module.exports = User;


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email:    { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role:     { type: String, enum: ['admin', 'user'], default: 'user' },
// }, { timestamps: true });

// // Password hashing
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Password comparison
// userSchema.methods.matchPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('User', userSchema);
