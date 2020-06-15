const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String },
  confirmPassword: { type: String },
  filename: { type: String },
  dateOfBirth: { type: String },
  aboutYou: { type: String },
  role: { type: String }
}, { collection : 'user' });
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;