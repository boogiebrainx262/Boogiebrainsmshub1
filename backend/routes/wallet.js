const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wallet = require("../models/Wallet");

// Fund wallet (add money)
router.post("/fund", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // 1. Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Update user balance
    user.walletBalance += amount;
    await user.save();

    // 3. Find or create wallet document
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, transactions: [] });
    }

    // 4. Add transaction record
    wallet.transactions.push({
      amount,
      type: "deposit",
      status: "Success",
      date: new Date()
    });
    await wallet.save();

    // 5. Respond with success
    res.json({
      message: "Wallet funded successfully",
      balance: user.walletBalance,
      transactions: wallet.transactions
    });
  } catch (err) {
    console.error("Fund wallet error:", err);
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
    console.error("Get wallet history error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;