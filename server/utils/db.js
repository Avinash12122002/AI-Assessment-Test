const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI)
    console.log('MongoDB Connected');
  } catch (error) {
    console.error("Database Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDb;