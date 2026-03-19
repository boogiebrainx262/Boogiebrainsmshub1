import React, { useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orderData, setOrderData] = useState({ productId: "", quantity: 1 });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setOrderData({ ...orderData, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, orderData);
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // use token from login
          },
        }
      );
      setMessage("Order placed successfully!");
    } catch (err) {
      setMessage("Order failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Place Order</h1>
      <form onSubmit={handleOrder}>
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={orderData.productId}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={orderData.quantity}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Submit Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Orders;