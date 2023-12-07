const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const middlewares = require('../middlewares');

router.get('/', middlewares.validateAdmin, orderController.getOrders);

module.exports = router;
