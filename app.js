const express = require('express');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    // console.log("req",req.body)
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"
    );
    if (req.headers.origin) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
  });

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
