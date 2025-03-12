import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const orderSummary = location.state?.orderSummary; // Fetch passed order summary from navigation state
  const navigate = useNavigate();

  

  return (
    <div className="order-confirmation">
      <h1>Thank You for Your Purchase! 🎉</h1>
      <p>Your order has been placed successfully.</p>

      

      <button onClick={() => navigate("/")} className="home-button">
        Go to Home
      </button>

      <style jsx>{`
        .order-confirmation {
          text-align: center;
          margin-top: 50px;
          font-family: Arial, sans-serif;
        }

        h1 {
          font-size: 2.5rem;
          color:rgb(5, 78, 5);
          margin-bottom: 20px;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 30px;
        }

        .order-summary {
          margin: 20px 0;
          font-size: 1.1rem;
        }

        .order-summary h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .order-summary ul {
          list-style-type: none;
          padding: 0;
        }

        .order-summary ul li {
          margin: 5px 0;
        }

        .home-button {
          padding: 10px 20px;
          background-color: green;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .home-button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
}

export default OrderConfirmation;
