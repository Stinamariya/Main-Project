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
      alert(`Order status updated to ${status}!`);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status!");
    }
  };

  const deleteOrder = async (id) => {
    // Confirm the deletion with the user
    const isConfirmed = window.confirm("Are you sure you want to delete this order?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3031/api/orders/${id}`);
        fetchOrders(); // Refresh orders after deleting
        alert("Order deleted successfully!");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Error deleting order!");
      }
    } else {
      alert("Order deletion canceled.");
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <strong>Order ID:</strong> {order._id} <br />
                <strong>Status:</strong> {order.status}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => updateOrderStatus(order._id, "Shipped")}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
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
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
