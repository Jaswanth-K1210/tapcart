const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.post('/add', protect, cartController.addItemToCart);

router.get('/', protect, cartController.viewUserCart);

router.post('/remove', protect, cartController.removeItemFromCart);

router.post('/lock', protect, cartController.lockCart);

module.exports = router;
