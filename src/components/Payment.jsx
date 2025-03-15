import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("Payment Page Loaded"); // Debugging Log

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Payment Successful! 🎉");
  
      // Clear only the logged-in user's cart
      const userId = localStorage.getItem("userId");
      localStorage.removeItem(`cart_${userId}`);
  
      navigate("/order-confirmation", { replace: true });
      setLoading(false);
    }, 2000);
  };
  
  

  return (
    <div style={styles.container}>
      <h2>Dummy Payment</h2>
      <p>This is a test payment page. No real transaction will occur.</p>

      <button
        onClick={handlePayment}
        style={styles.payButton}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  payButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default Payment;
