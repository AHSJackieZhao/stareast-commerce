const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'stareast-secret-key';
const JWT_EXPIRES_IN = '1h';

const register = async (username, email, password) => {
  if (userModel.findByUsername(username)) {
    throw new Error('Username already exists');
  }
  if (userModel.findByEmail(email)) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userModel.createUser(username, email, hashedPassword);
  return { id: user.id, username: user.username, email: user.email };
};

const login = async (username, password) => {
  const user = userModel.findByUsername(username);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  return { token };
};

module.exports = { register, login };
