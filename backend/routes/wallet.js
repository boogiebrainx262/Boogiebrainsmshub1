const express = require("express");
const Wallet = require("../models/Wallet");
const User = require("../models/User");

const router = express.Router();

// Fund wallet
router.post("/fund", async (req, res) => {
  const { userId, amount } = req.body;
  const user = await User.findById(userId);
  user.walletBalance += amount;
  await user.save();

  const wallet = await Wallet.findOne({ userId });
  wallet.transactions.push({ amount, type: "deposit", status: "Success" });
  await wallet.save();

  res.json({ message: "Wallet funded successfully", balance: user.walletBalance });
});

// Get wallet history
router.get("/:userId", async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.params.userId });
  res.json(wallet.transactions);
});

module.exports = router;
