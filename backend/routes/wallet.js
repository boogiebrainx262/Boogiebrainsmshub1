const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");
const User = require("../models/User");

// Fund wallet (user route)
router.post("/fund", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, transactions: [] });
    }

    wallet.transactions.push({
      amount,
      type: "deposit",
      status: "Success",
      date: new Date()
    });

    await wallet.save();

    // Update user balance
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.walletBalance += amount;
    await user.save();

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

// Get wallet history (user route)
router.get("/:userId", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    res.json(wallet.transactions);
  } catch (err) {
    console.error("Get wallet error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin withdraw route
router.post("/admin/withdraw", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check balance
    if (user.walletBalance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    // Find wallet
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    // Add withdrawal transaction
    wallet.transactions.push({
      amount,
      type: "withdrawal",
      status: "Success",
      date: new Date()
    });

    await wallet.save();

    // Deduct from user balance
    user.walletBalance -= amount;
    await user.save();

    res.json({
      message: "Withdrawal successful (admin)",
      balance: user.walletBalance,
      transactions: wallet.transactions
    });
  } catch (err) {
    console.error("Admin withdraw error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;