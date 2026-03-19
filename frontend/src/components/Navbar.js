import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h2>BoogieBrainsMSHub</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/wallet">Fund Wallet</Link></li>
        <li><Link to="/orders">My Orders</Link></li>
        <li><a href="https://wa.me/2348144886427" target="_blank" rel="noreferrer">Support</a></li>
        <li><Link to="/terms">Terms of Use</Link></li>
        <li><Link to="/rules">Rules</Link></li>
        <li><a href="https://chat.whatsapp.com/DjuYkvGWBtgHo7f29lPvCj" target="_blank" rel="noreferrer">Join Our Community</a></li>
      </ul>
    </nav>
  );
    }
