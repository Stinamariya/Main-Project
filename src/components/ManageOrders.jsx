import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3031/api/orders");
      console.log("Orders Data:", res.data); // ✅ Check if data is received
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error); // ❌ Log errors
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3031/api/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3031/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Manage Orders</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "16px", color: "#666" }}>
          No orders found.
        </p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{
                background: "#f9f9f9",
                border: "1px solid #ddd",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <strong>Order ID:</strong> {order._id} | <strong>Status:</strong>{" "}
                {order.status}
              </div>
              <div>
                <button
                  onClick={() => updateOrderStatus(order._id, "Shipped")}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => deleteOrder(order._id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageOrders;
