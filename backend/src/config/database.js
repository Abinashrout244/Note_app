const mongoose = require("mongoose");

const DBConnection = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = DBConnection;
