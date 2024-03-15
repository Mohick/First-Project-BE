const mongoose = require("mongoose");
async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.atLatMongose, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    alerting(error);
  }
}

module.exports = connectDB;
