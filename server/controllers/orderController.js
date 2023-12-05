const Order = require('../database/models/orderModel');
async function getOrders(req, res) {
  try {
    const orders = await Order.find();

    if (!orders) return res.status(404).json({ message: 'No orders found' });

    return res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getOrders };
