const express = require('express');
const OrderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/', authMiddleware, OrderController.getOrders);
router.get('/items/:orderId', authMiddleware, OrderController.getOrderItems);
router.get('/:userId', authMiddleware, OrderController.getUserOrders);
router.get('/reports/monthly', authMiddleware, OrderController.getMonthlyReport);
router.get('/reports/employee/:userId', authMiddleware, OrderController.getEmployeeReport);

router.get('/reports/:userId/items', authMiddleware, OrderController.getOrderItemsByUserIdAndDateRange);

module.exports = router;
