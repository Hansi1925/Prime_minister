const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  tokenHash: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  usedAt: { type: DataTypes.DATE, allowNull: true }
}, { tableName: 'password_reset_tokens', timestamps: true });

module.exports = PasswordResetToken;
