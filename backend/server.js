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

// MongoDB connection + server start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));