const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wallet = require("../models/Wallet");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // create new user
    const user = new User({ email, password });
    const newUser = await user.save();

    // create wallet for this user
    const newWallet = new Wallet({
      userId: newUser._id,
      transactions: []
    });
    await newWallet.save();

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;