import React, { useState, useEffect } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("User not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3031/api/orders/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Orders</h2>

      {loading ? (
        <p style={styles.loading}>Loading orders...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <img
                src={order.productImage || "https://via.placeholder.com/80"}
                alt={order.productName || "Product"}
                style={styles.image}
              />
              <div style={styles.details}>
                <h3>{order.productName || "Unknown Product"}</h3>
                <p><strong>Price:</strong> ₹{order.price || "N/A"}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {order.status || "Processing"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  loading: {
    fontSize: "1.2rem",
    color: "#666",
  },
  error: {
    fontSize: "1.2rem",
    color: "red",
  },
  noOrders: {
    fontSize: "1.2rem",
    color: "#666",
  },
  ordersList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  orderCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "15px",
    width: "80%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  image: {
    width: "80px",
    height: "80px",
    marginRight: "15px",
    borderRadius: "8px",
  },
  details: {
    textAlign: "left",
  },
};

export default MyOrders;
