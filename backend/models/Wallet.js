const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  transactions: [
    {
      date: { type: Date, default: Date.now },
      amount: Number,
      type: String, // deposit or purchase
      status: String
    }
  ]
});

module.exports = mongoose.model("Wallet", WalletSchema);
