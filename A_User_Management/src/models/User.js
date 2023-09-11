const mongoose = require("mongoose");

const userDetail = new mongoose.Schema({
  Name: String,
  Address: String,
  Nic: Number,
});

module.exports = mongoose.model("user", userDetail);
