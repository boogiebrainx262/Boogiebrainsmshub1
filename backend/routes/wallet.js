const express = require("express");
const Wallet = require("../models/Wallet");
const User = require("../models/User");

const router = express.Router();

// Fund wallet
router.post("/fund", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.walletBalance += amount;
    await user.save();

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, transactions: [] });
    }

    wallet.transactions.push({ amount, type: "deposit", status: "Success" });
    await wallet.save();

    res.json({ message: "Wallet funded successfully", balance: user.walletBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get wallet history
router.get("/:userId", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    res.json(wallet.transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;