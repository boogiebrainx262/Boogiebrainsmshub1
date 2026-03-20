const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wallet = require("../models/Wallet");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const user = new User({ email, password, walletBalance: 0 });
    const newUser = await user.save();

    // Create wallet for new user
    const newWallet = new Wallet({ userId: newUser._id, transactions: [] });
    await newWallet.save();

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and password
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;