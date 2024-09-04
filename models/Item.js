const db = require('../utils/db');

class Item {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM Items');
    return rows;
  }

  static async create(item) {
    const { name, price } = item;
    const [result] = await db.execute('INSERT INTO Items (name, price) VALUES (?, ?)', [name, price]);
    return { id: result.insertId, name, price };
  }

  static async update(id, price) {
    await db.execute('UPDATE Items SET price = ? WHERE id = ?', [price, id]);
    const [updatedRows] = await db.execute('SELECT * FROM Items WHERE id = ?', [id]);
    return updatedRows[0];
  }
}

module.exports = Item;