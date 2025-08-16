const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Form = sequelize.define('Form', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  // Store arbitrary form payloads safely as JSON
  data: { type: DataTypes.JSON }
}, { tableName: 'forms', timestamps: true });

module.exports = Form;


// const mongoose = require('mongoose');

// const formSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true });

// module.exports = mongoose.model('Form', formSchema);
