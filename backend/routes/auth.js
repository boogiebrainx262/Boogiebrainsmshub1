router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = new User({ email, password });
    const newUser = await user.save();

    // create wallet for new user
    const newWallet = new Wallet({ userId: newUser._id, transactions: [] });
    await newWallet.save();

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});