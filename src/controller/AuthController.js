
const { generateToken } = require('../config/JwtUtil');

const user = {
    id: 1,
    username: 'johnDoe',
    password: 'password',
  };
  
  // Login Route
const loginController = (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password match
    if (username === user.username && password === user.password) {
      // Generate JWT token
      const token = generateToken({ id: user.id, username: user.username });
  
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }
};

module.exports = {
  loginController,
};