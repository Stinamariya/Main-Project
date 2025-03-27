import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found. Please log in.");
      return;
    }

    fetch(`http://localhost:3031/api/orders/latest/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Order:", data);
        setOrder(data.order);
      })
      .catch((error) => console.error("Error fetching order:", error));
  }, [userId]);

  if (!userId) {
    return <p style={{ color: "red", textAlign: "center" }}>User not logged in. Please log in first.</p>;
  }

  if (!order) {
    return <p style={{ textAlign: "center", color: "#555" }}>No recent order found.</p>;
  }

  return (
    <div style={{
      maxWidth: "650px",
      margin: "40px auto",
      padding: "20px",
      borderRadius: "12px",
      background: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", color: "#333", borderBottom: "2px solid #007bff", paddingBottom: "8px" }}>Order Summary</h2>

      <div style={{ padding: "10px 0", lineHeight: "1.6" }}>
        <p><strong>Order By:</strong> {order.name}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      </div>

      <h3 style={{ marginTop: "20px", color: "#444" }}>Products Ordered:</h3>
      <div style={{ display: "grid", gap: "12px" }}>
        {order.products.map((product) => (
          <div key={product._id} style={{
            display: "flex",
            alignItems: "center",
            background: "#f9f9f9",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0", fontWeight: "bold" }}>{product.productName}</p>
              <p style={{ margin: "4px 0 0", color: "#666" }}>₹{product.price} x {product.quantity}</p>
            </div>
            <p style={{ fontWeight: "bold", color: "#007bff" }}>₹{(product.price * product.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "15px", textAlign: "right", color: "#333" }}>
        Total: ₹{order.products.reduce((sum, product) => sum + (product.price || 0) * product.quantity, 0).toFixed(2)}
      </h3>

      <button
        onClick={() => navigate(`/orderconfirm/${order._id}`)}
        style={{
          display: "block",
          width: "100%",
          padding: "12px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
          transition: "background 0.3s"
        }}
        onMouseOver={(e) => (e.target.style.background = "#0056b3")}
        onMouseOut={(e) => (e.target.style.background = "#007bff")}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Orders;
