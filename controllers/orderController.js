const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

class OrderController {
  static async getOrderItems(req, res) {
    const { orderId } = req.params;
    console.log('orderId: ', orderId);
    const orders = await OrderItem.getOrderItems(orderId);
    console.log('orders: ', orders);
    res.send(orders);
  }

  static async getOrderItemsByUserIdAndDateRange(req, res) {
    try {
      const { userId } = req.params; // Assuming userId is passed as a route parameter
      const { startDate, endDate } = req.query; // Assuming startDate and endDate are passed as query parameters
      
      // Validate input
      if (!userId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Missing required parameters: userId, startDate, or endDate.' });
      }
  
      // Fetch order details by userId and date range
      const orders = await OrderItem.getOrderDetailsByUserIdAndDateRange(userId, startDate, endDate);
  
      // Send the response
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching order items:', error);
      res.status(500).json({ message: 'An error occurred while fetching the order items.' });
    }
  }

  static async createOrder(req, res) {
    const { userId, total, items } = req.body;
    const order = await Order.create({ userId, total });

    for (const item of items) {
      await OrderItem.create({ orderId: order.id, itemId: item.itemId, quantity: item.quantity });
    }

    res.send(order);
  }

  static async getOrders(req, res) {
    const orders = await Order.findAll();
    res.send(orders);
  }

  static async getUserOrders(req, res) {
    const { userId } = req.params;
    const orders = await Order.findByUserId(userId);
    res.send(orders);
  }

  static async getMonthlyReport(req, res) {

    const { startDate, endDate } = req.query;

    try {
      const report = await Order.getReportByDateRange(startDate, endDate);
      res.send(report);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch report' });
    }
  }

  static async getEmployeeReport(req, res) {
    const { userId } = req.params;
    const report = await Order.getEmployeeReport(userId);
    res.send(report);
  }
}

module.exports = OrderController;
