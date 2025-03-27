import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f4f4f9",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        maxWidth: "450px",
        width: "90%"
      }}>
        <h2 style={{ color: "#007bff", marginBottom: "10px" }}>🎉 Order Confirmed!</h2>
        <p style={{ color: "#555", fontSize: "18px" }}>Thank you for your order! Your Order ID is:</p>
        <h3 style={{
          color: "green",
          background: "#e6f7e6",
          padding: "8px 15px",
          borderRadius: "8px",
          display: "inline-block",
          fontWeight: "bold"
        }}>
          {orderId}
        </h3>

        <button
          onClick={() => navigate("/user-dashboard")}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background 0.3s"
          }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007bff")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
