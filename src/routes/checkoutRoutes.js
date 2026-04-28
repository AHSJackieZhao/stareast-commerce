const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const checkoutController = require('../controllers/checkoutController');

router.post('/', authenticate, checkoutController.checkout);

module.exports = router;
