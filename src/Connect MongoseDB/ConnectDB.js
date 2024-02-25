const mongoose = require("mongoose");
async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://127.0.0.1:27017/API_Best_Music");
  } catch (error) {
    alerting(error);
  }
}

module.exports = connectDB;
