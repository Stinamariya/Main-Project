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
        console.log("Fetched Order:", data); // Debugging
        setOrder(data.order); // Set only the latest order
      })
      .catch((error) => console.error("Error fetching order:", error));
  }, [userId]);

  if (!userId) {
    return <p style={{ color: "red" }}>User not logged in. Please log in first.</p>;
  }

  if (!order) {
    return <p>No recent order found.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Order Summary</h2>
      <p><strong>Order By:</strong> {order.name}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <h3>Product Details:</h3>
      {order.products.map((product) => (
        <div key={product._id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
          <p><strong>{product.productName}</strong> - ₹{product.price} (Qty: {product.quantity})</p>
        </div>
      ))}
      <button
        onClick={() => navigate(`/orderconfirm/${order._id}`)}
        style={{ marginTop: "15px", padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Orders;
