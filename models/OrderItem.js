const db = require('../utils/db');

class OrderItem {
  static async create(orderItem) {
    const { orderId, itemId, quantity } = orderItem;
    await db.execute('INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (?, ?, ?)', [orderId, itemId, quantity]);
  }
  static async getOrderItems(orderId) {
    // const { orderId, itemId, quantity } = orderItem;
    const [rows] = await db.execute('SELECT * FROM OrderItems WHERE order_id = ?', [orderId]);
    return rows;
  }

  static async getOrderDetailsByUserIdAndDateRange(userId, startDate, endDate) {
    const [rows] = await db.execute(`
      SELECT 
        Orders.user_id AS userId, 
        Orders.id AS orderId, 
        Orders.created_at AS created_at, 
        OrderItems.item_id AS itemId,
        Items.name AS itemName, 
        Items.price AS price, 
        OrderItems.quantity AS quantity
      FROM 
        OrderItems
      INNER JOIN 
        Orders ON OrderItems.order_id = Orders.id
      INNER JOIN 
        Items ON OrderItems.item_id = Items.id
      WHERE 
        Orders.user_id = ? 
        AND Orders.created_at BETWEEN ? AND ?;
    `, [userId, startDate, endDate]);
    
    return rows;
  }
}

module.exports = OrderItem;
