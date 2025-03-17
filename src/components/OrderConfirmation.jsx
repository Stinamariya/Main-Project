import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>🎉 Order Confirmed!</h2>
      <p>Thank you for your order. Your Order ID is:</p>
      <h3 style={{ color: "green" }}>{orderId}</h3>

      <button
        onClick={() => navigate("/user-dashboard")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default OrderConfirmation;

