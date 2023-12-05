const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderNumber: { type: String, required: false, maxlength: 10 },
  userId: { type: String, maxlength: 50 },
  firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true, maxlength: 100 },
  countryCode: { type: String, required: true, maxlength: 4 },
  number: { type: String, required: true, maxlength: 20 },
  residence: { type: String, required: true, maxlength: 50 },
  total: { type: String, required: true, maxlength: 10 },
  service: { type: String, required: true, maxlength: 10 },
  paymentMethod: { type: String, required: true, maxlength: 15 },
  nonCakesDate: { type: String, maxlength: 11 },
  nonCakesTime: { type: String, maxlength: 14 },
  cakesDate: { type: String, maxlength: 11 },
  cakesTime: { type: String, maxlength: 14 },
  items: { type: Array, required: true },
  confirmation: { type: String, maxlength: 14 },
  status: { type: String, default: 'Not Complete', maxlength: 14 },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
