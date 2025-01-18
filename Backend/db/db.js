const mongoose = require("mongoose");

// Function to connect to the database
function connectDB() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    });
}

module.exports = connectDB;
