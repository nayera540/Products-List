const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/product');

const server = express();

const dbURI = 'mongodb+srv://nayerahazem26:Pe3qeascnLqcu9EE@cluster0.l4uuf.mongodb.net/Fake_Store?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/product', productRoutes);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
