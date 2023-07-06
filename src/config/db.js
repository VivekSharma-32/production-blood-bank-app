const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(
      `Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`MongoDB Database Error: ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
