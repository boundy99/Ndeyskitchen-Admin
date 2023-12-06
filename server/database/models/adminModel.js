const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Adminchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 20 },
  password: { type: String, required: true, maxlength: 20 },
});

const Admin = mongoose.model('Order', Adminchema);

module.exports = Admin;
