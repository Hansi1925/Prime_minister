const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const RefreshToken = sequelize.define('RefreshToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  tokenHash: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  revokedAt: { type: DataTypes.DATE, allowNull: true },
  replacedByTokenHash: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'refresh_tokens', timestamps: true });

module.exports = RefreshToken;
