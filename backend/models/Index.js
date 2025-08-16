const sequelize = require('../config/db.js');
const User = require('./User.js');
const Form = require('./Form.js');
const RefreshToken = require('./RefreshToken.js');
const PasswordResetToken = require('./PasswordResetToken.js');

User.hasMany(Form, { foreignKey: 'createdBy', as: 'forms' });
Form.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PasswordResetToken, { foreignKey: 'userId', as: 'resetTokens' });
PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Form, RefreshToken, PasswordResetToken };

