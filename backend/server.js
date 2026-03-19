const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const walletRoutes = require("./routes/wallet");
const orderRoutes = require("./routes/orders");

// Mount routes with /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/orders", orderRoutes);

// Root route (homepage)
app.get("/", (req, res) => {
  res.send("🚀 BoogieBrains SMS Hub Backend is live!");
});

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log("✅ Connected to MongoDB");
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});