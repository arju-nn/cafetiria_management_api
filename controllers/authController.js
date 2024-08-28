const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }
    
    const token = generateToken(user);
    delete user.password
    console.log('{ user, token }: ', { user, token }); 
    res.send({ user, token });
  }
}

module.exports = AuthController;
