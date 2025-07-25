const mongoose = require("mongoose");

async function connectDb() {
  try {
    console.log("establishing db connection...");
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("DB Connection successful");
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

module.exports = connectDb;