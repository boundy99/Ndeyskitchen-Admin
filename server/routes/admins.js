const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const middlewares = require('../middlewares');

router.post('/', middlewares.validateAdmin, adminController.adminLogin);

module.exports = router;
