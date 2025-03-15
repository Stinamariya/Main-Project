import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Thank you for your order!</h2>
      <p style={styles.message}>Your order has been successfully placed.</p>
      <Link to="/user-dashboard" style={styles.link}>Go back to dashboard</Link>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  heading: {
    color: "#28a745", // Green for success
    marginBottom: "10px",
  },
  message: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  link: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

export default OrderConfirmation;
