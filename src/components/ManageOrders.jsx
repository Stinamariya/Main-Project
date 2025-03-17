import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3031/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3031/api/orders/${id}`, { status });
      fetchOrders(); // Refresh orders after status update
      alert("Order status updated to Shipped!"); // Show alert after successful update
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status!"); // Show alert if there's an error
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3031/api/orders/${id}`);
      fetchOrders(); // Refresh orders after deleting
      alert("Order deleted successfully!"); // Show alert after successful deletion
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order!"); // Show alert if there's an error
    }
  };

  // Function to navigate to the previous page
  const goBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Manage Orders</h2>

      {/* Back Button */}
      <button
        onClick={goBack}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Back
      </button>

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
