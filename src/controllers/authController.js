const authService = require('../services/authService');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email, and password are required' });
  }
  try {
    const user = await authService.register(username, email, password);
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }
  try {
    const result = await authService.login(username, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { register, login };
