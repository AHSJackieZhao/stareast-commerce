const products = [
  { id: '1', name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
  { id: '2', name: 'Wireless Mouse', price: 29.99, description: 'Ergonomic wireless mouse' },
  { id: '3', name: 'USB-C Hub', price: 49.99, description: '7-in-1 USB-C hub' }
];

const findById = (id) => products.find((p) => p.id === String(id));

const findAll = () => products;

module.exports = { findById, findAll };
