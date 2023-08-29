const mongoose = require("mongoose");

const customerdetail = new mongoose.Schema({
  Name: String,
  Address: String,
  Nic: Number,
});

module.exports = mongoose.model("customer", customerdetail);
