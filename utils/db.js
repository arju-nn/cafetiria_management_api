const mysql = require('mysql2/promise');
require('dotenv').config();

// console.log('Database Configuration:');
// console.log(`Host: ${process.env.DB_HOST}`);
// console.log(`User: ${process.env.DB_USER}`);
// console.log(`Password: ${process.env.DB_PASSWORD}`);
// console.log(`Database: ${process.env.DB_NAME}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'ccs#1234',
//   database: 'cafeteria_management',
// });

module.exports = pool;
