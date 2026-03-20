import React, { useState, useEffect } from "react";

const Wallet = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/wallet/${userId}`)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error("Error fetching wallet:", err));
  }, [userId, API_URL]);

  const fundWallet = async (amount) => {
    const res = await fetch(`${API_URL}/wallet/fund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount })
    });
    const data = await res.json();
    setBalance(data.balance);
    setTransactions(data.transactions);
  };

  return (
    <div>
      <h2>Wallet</h2>
      <p>Balance: {balance}</p>
      <button onClick={() => fundWallet(100)}>Fund ₦100</button>

      <h3>Transactions</h3>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>
            {t.type} - {t.amount} - {t.status} - {new Date(t.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet;