import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};

  if (!prediction) {
    return <p>No prediction data available.</p>;
  }

  // Store recommended products in localStorage
  localStorage.setItem("recommendedProducts", JSON.stringify(prediction.recommendedProducts));

  // Navigate to Products page with correct state
  const handleViewProducts = () => {
    navigate("/products", {
      state: {
        recommendedProducts: prediction.recommendedProducts,
        skinType: prediction.skinType,
        skinCondition: prediction.skinCondition
      },
    });
  };

  return (
    <div className="results-container">
      <h1>Prediction Result</h1>
      <p><strong>Skin Type:</strong> {prediction.skinType}</p>
      <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>

      <button className="btn" onClick={() => navigate("/Questionnaire")}>Back</button>
      <button className="btn" onClick={handleViewProducts}>
        View Recommended Products
      </button>
      <button className="btn" onClick={() => navigate("/cart")}>Go to Cart</button>

      <style jsx>{`
        .results-container {
          text-align: center;
          padding: 20px;
        }
        
        .results-container h1 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .results-container p {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }

        .btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          margin: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}

export default Results;
