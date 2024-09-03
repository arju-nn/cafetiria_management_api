const db = require('../utils/db');

class Order {
  static async create(order) {
    const { userId, total } = order;
    const [result] = await db.execute('INSERT INTO Orders (user_id, total) VALUES (?, ?)', [userId, total]);
    return { id: result.insertId, userId, total };
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM Orders');
    return rows;
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    return rows;
  }

  // static async getMonthlyReport() {
  //   const [rows] = await db.execute('SELECT * FROM Orders WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())');
  //   return rows;
  // }

  static async getReportByDateRange(startDate, endDate) {
    const query = `
      SELECT 
        o.id AS order_id, 
        o.user_id, 
        u.email AS user_email, 
        o.created_at AS order_date, 
        oi.item_id, 
        oi.quantity, 
        i.name AS item_name, 
        i.price 
      FROM 
        Orders o
      INNER JOIN 
        OrderItems oi ON o.id = oi.order_id
      INNER JOIN 
        Items i ON oi.item_id = i.id
      INNER JOIN 
        Users u ON o.user_id = u.id
      WHERE 
        o.created_at BETWEEN ? AND ?
    `;
  
    const [rows] = await db.execute(query, [startDate, endDate]);
    return rows;
  }
  
  
  static async getEmployeeReport(userId) {
    const [rows] = await db.execute('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    return rows;
  }
}

module.exports = Order;
