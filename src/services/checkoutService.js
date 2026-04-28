const productModel = require('../models/productModel');

const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];
const CASH_DISCOUNT_RATE = 0.10;

const checkout = (items, paymentMethod) => {
  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    throw new Error('Payment method must be cash or credit_card');
  }
  if (!items || items.length === 0) {
    throw new Error('At least one item is required');
  }

  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = productModel.findById(item.productId);
    if (!product) {
      throw new Error(`Product with id ${item.productId} not found`);
    }
    if (!item.quantity || item.quantity < 1) {
      throw new Error(`Invalid quantity for product ${item.productId}`);
    }
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      itemTotal: parseFloat(itemTotal.toFixed(2))
    });
  }

  const discount = paymentMethod === 'cash' ? subtotal * CASH_DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  return {
    items: orderItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    paymentMethod
  };
};

module.exports = { checkout };
