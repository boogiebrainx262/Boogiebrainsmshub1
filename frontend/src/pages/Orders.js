import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, orderData)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o._id}>
          <p>Product ID: {o.productId}</p>
          <p>Amount: ₦{o.amount}</p>
          <p>Status: {o.status}</p>
          <p>Date: {new Date(o.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
