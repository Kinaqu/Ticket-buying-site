const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  PasswordHash: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;