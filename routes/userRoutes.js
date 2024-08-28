const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route to create a new user
router.post('/create', UserController.createUser);
router.get('/', UserController.getUsers);

module.exports = router;
