const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const middlewares = require('../middlewares');

router.post('/', middlewares.validateAdmin, orderController.getOrders);
router.post(
  '/get-order-receipt',
  middlewares.validateAdmin,
  orderController.getOrderReceipt
);

module.exports = router;
