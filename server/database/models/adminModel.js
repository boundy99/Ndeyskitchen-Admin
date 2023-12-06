const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Adminchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 20 },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', Adminchema);

module.exports = Admin;
