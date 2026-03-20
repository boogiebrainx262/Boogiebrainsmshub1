const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wallet = require("../models/Wallet");

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    const newUser = await user.save();

    // Create wallet automatically
    const newWallet = new Wallet({ userId: newUser._id, transactions: [] });
    await newWallet.save();

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;