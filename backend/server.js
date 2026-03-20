const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const walletRoutes = require("./routes/wallet");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://boogiebrainsmshub1.onrender.com", // your frontend Render URL
  methods: ["GET", "POST"],
  credentials: true
}));

// Routes
app.use("/api/wallet", walletRoutes);

module.exports = app;