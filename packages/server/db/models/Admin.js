const mongoose = require('../db');

const adminSchema = new mongoose.Schema({
  AdminLogin: { type: String, required: true, unique: true },
  AdminPassword: { type: String, required: true },
  AdminName: { type: String, required: true }
});



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;