import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3031/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="section">
      <h3>Orders</h3>
      <button onClick={fetchOrders}>Refresh</button>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - ${order.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
