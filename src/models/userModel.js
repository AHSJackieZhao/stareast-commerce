const bcrypt = require('bcryptjs');

const users = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10)
  },
  {
    id: '2',
    username: 'jane_doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password456', 10)
  },
  {
    id: '3',
    username: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10)
  }
];

const findByUsername = (username) => users.find((u) => u.username === username);

const findByEmail = (email) => users.find((u) => u.email === email);

const findById = (id) => users.find((u) => u.id === id);

const createUser = (username, email, hashedPassword) => {
  const newUser = {
    id: String(users.length + 1),
    username,
    email,
    password: hashedPassword
  };
  users.push(newUser);
  return newUser;
};

module.exports = { findByUsername, findByEmail, findById, createUser };
