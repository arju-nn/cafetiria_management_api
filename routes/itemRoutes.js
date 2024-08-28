const express = require('express');
const ItemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', ItemController.getItems);
router.post('/', authMiddleware, ItemController.createItem);
router.put('/:id', authMiddleware, ItemController.updateItem);

module.exports = router;
