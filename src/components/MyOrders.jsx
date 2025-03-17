import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // Store orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Navigation hook

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }

    setLoading(true); // Start loading state

    fetch(`http://localhost:3031/api/orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Orders:", data); // Debugging: log fetched data
        if (data.orders) {
          setOrders(data.orders); // Set orders if available
        } else {
          setError("No orders found.");
        }
      })
      .catch((error) => {
        setError("Error fetching orders."); // Set error if fetching fails
        console.error("Error fetching orders:", error);
      })
      .finally(() => setLoading(false)); // End loading state
  }, [userId]);

  // Function to navigate to order confirmation page
  const goToOrderConfirmation = (orderId) => {
    navigate(`/orderconfirm/${orderId}`);
  };

  // Function to navigate to the previous page
  const goBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div style={styles.container}>
      <h2>My Orders</h2>

      {/* Show error message if there is an error */}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Display total number of orders */}
      <p>Orders found: {orders.length}</p>

      {/* Back Button */}
      <button onClick={goBack} style={styles.backButton}>
        Back
      </button>

      {/* Show loading state */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        // Display orders if available
        orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <h3>Order ID: {order._id}</h3> {/* Displaying the Order ID */}
            <h3>Order by: {order.name}</h3>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Status:</strong> {order.status}</p> {/* Displaying the order status */}
            
            <h4>Products:</h4>
            <ul style={styles.productList}>
              {order.products.map((product) => (
                <li key={product._id} style={styles.productItem}>
                  <img
                    src={product.productPic}
                    alt={product.productName}
                    style={styles.productImage}
                  />
                  <strong>{product.productName}</strong> - ₹{product.price} (Qty: {product.quantity})
                </li>
              ))}
            </ul>

            {/* Order Confirmation Button */}
            
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

// Inline styles object
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
  },
  productImage: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    objectFit: "cover",
  },
  confirmButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default MyOrders;




