const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserController {
  static async createUser(req, res) {
    const { email, password, role = "Employee" } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create the user
      const newUser = await User.create({ email, password: hashedPassword, role });

      res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  static async getUsers(req, res) {
    const users = await User.findAll();
    res.send(users);
  }
}

module.exports = UserController;
