import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }

    setLoading(true);

    fetch(`http://localhost:3031/api/orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Orders:", data);
        if (data.orders) {
          setOrders(data.orders);
        } else {
          setError("No orders found.");
        }
      })
      .catch((error) => {
        setError("Error fetching orders.");
        console.error("Error fetching orders:", error);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <h2>My Orders</h2>

      {error && <p style={styles.errorText}>{error}</p>}
      <p>Orders found: {orders.length}</p>

      <button onClick={goBack} style={styles.backButton}>
        Back
      </button>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <h3>Order ID: {order._id}</h3>
            <h3>Order by: {order.name}</h3>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <h4>Products:</h4>
            <ul style={styles.productList}>
              {order.products.map((product) => (
                <li key={product._id} style={styles.productItem}>
                  <img
                    src={product.productPic}
                    alt={product.productName}
                    style={styles.productImage}
                  />
                  <span>
                    <strong>{product.productName}</strong> - ₹{product.price} (Qty: {product.quantity})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  orderCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    background: "#f9f9f9",
  },
  productList: {
    listStyleType: "none",
    padding: 0,
  },
  productItem: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  productImage: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    objectFit: "cover",
  },
};

export default MyOrders;
