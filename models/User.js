const db = require('../utils/db');

class User {

  // Find all users
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM Users');
    return rows;
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0]; // Return the first row, if exists
  }

  // Find user by ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0]; // Return the first row, if exists
  }

  // Create a new user
  static async create(user) {
    const { email, password, role } = user;
    const [result] = await db.execute('INSERT INTO Users (email, password, role) VALUES (?, ?, ?)', [email, password, role]);
    return { id: result.insertId, email, password, role }; // Return the inserted user details
  }
}

module.exports = User;


// const db = require('../utils/db');

// class User {
//   static async findByEmail(email) {
//     const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
//     return rows[0];
//   }

//   static async findById(id) {
//     const [rows] = await db.execute('SELECT * FROM Users WHERE id = ?', [id]);
//     return rows[0];
//   }

//   static async create(user) {
//     const { email, password } = user;
//     const [result] = await db.execute('INSERT INTO Users (email, password) VALUES (?, ?)', [email, password]);
//     return { id: result.insertId, email, password };
//   }
// }

// module.exports = User;
