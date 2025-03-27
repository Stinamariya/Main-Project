import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};

  if (!prediction) {
    return <h2 className="message">No prediction data available.</h2>;
  }

  // Store recommended products in localStorage
  localStorage.setItem("recommendedProducts", JSON.stringify(prediction.recommendedProducts));

  return (
    <div className="results-container">
      <div className="card-large">
        <h1>🌿 Skin Analysis</h1>
        <div className="result-box">
          <p><strong>Skin Type:</strong> {prediction.skinType}</p>
          <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>
        </div>

        <div className="btn-group">
          <button onClick={() => navigate("/Questionnaire")} className="btn back">🔙 Retake Test</button>
          <button onClick={() => navigate("/products")} className="btn primary">💖 See Recommendations</button>
        </div>
      </div>

      <style jsx>{`
        .results-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #fdfbfb, #ebedee);
          padding: 20px;
        }

        .card-large {
          background: white;
          border-radius: 14px;
          padding: 40px; /* Increased padding */
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1); /* Increased shadow for a more prominent look */
          text-align: center;
          width: 100%;
          max-width: 500px; /* Increased width */
          transition: transform 0.3s ease;
        }

        .card-large:hover {
          transform: translateY(-10px); /* Adds a hover effect to elevate the card */
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 18px;
          color: #222;
        }

        .result-box {
          background: #f8f9fa;
          padding: 18px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        p {
          font-size: 1.3rem;
          color: #444;
          margin: 10px 0;
        }

        .btn-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn {
          padding: 16px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .primary {
          background: #28C76F;
          color: white;
        }

        .back {
          background: #FF9F43;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default Results;
