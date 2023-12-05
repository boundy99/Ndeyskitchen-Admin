const Order = require('../database/models/orderModel');
const sendEmail = require('../scripts/sendEmail');

const { ORDERS_NOT_FOUND } = require('../messages');

async function getOrders(req, res) {
  try {
    const orders = await Order.find();

    if (!orders) return res.status(404).json({ message: ORDERS_NOT_FOUND });

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

module.exports = { getOrders };
