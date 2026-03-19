import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
      setMessage(`Login successful! Token: ${res.data.token}`);
      // You can save token in localStorage for later use:
      // localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData
      );
      setMessage("Registration successful! You can now log in.");
    } catch (err) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Authentication</h1>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister} style={{ marginLeft: "10px" }}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;