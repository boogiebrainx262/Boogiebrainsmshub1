import React, { useEffect, useState } from "react";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/wallet`);
        setBalance(res.data.balance);
      } catch (err) {
        setError("Failed to load wallet");
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  if (loading) return <p>Loading wallet...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Wallet</h1>
      <p>Your balance: <strong>₦{balance}</strong></p>
    </div>
  );
};

export default Wallet;