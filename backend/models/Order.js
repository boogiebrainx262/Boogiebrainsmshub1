const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  amount: Number,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
