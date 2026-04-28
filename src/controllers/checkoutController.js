const checkoutService = require('../services/checkoutService');

const checkout = (req, res) => {
  const { items, paymentMethod } = req.body;
  if (!items || !paymentMethod) {
    return res.status(400).json({ message: 'items and paymentMethod are required' });
  }
  try {
    const order = checkoutService.checkout(items, paymentMethod);
    return res.status(200).json({ message: 'Checkout successful', order });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { checkout };
