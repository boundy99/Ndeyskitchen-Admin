const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const middlewares = require('../middlewares');

router.post('/', middlewares.validateAdmin, orderController.getOrders);

module.exports = router;
