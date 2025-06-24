// backend/config/db.js
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: ServerApiVersion.v1,  // Activa Stable API v1
    });
    console.log('MongoDB conectado correctamente con Stable API v1');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
