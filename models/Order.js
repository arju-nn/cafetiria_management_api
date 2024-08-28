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
    const [rows] = await db.execute('SELECT * FROM Orders WHERE created_at BETWEEN ? AND ?', [startDate, endDate]);
    return rows;
  }

  static async getEmployeeReport(userId) {
    const [rows] = await db.execute('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    return rows;
  }
}

module.exports = Order;
