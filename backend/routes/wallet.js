const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Admin-only withdraw route
router.post("/admin/withdraw", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    if (user.walletBalance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    user.walletBalance -= amount;
    await user.save();

    res.json({ message: "Withdrawal successful", balance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;