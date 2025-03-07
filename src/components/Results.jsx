import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  console.log("📌 Full Location State:", location.state);

  
  const predictionData = location.state?.prediction?.prediction || {};
  console.log("📌 Corrected Extracted Prediction Data:", predictionData);

  
  const predictedSkinType = predictionData?.predictedSkinType;
  const predictedSkinCondition = predictionData?.predictedSkinCondition;

  if (!predictedSkinType || !predictedSkinCondition) {
    return <h2>No prediction data found. Please complete the questionnaire.</h2>;
  }

  return (
    <div className="container">
      <h2>Predicted Skin Analysis</h2>
      <p><strong>Skin Type:</strong> {predictedSkinType}</p>
      <p><strong>Skin Condition:</strong> {predictedSkinCondition}</p>

      <button 
        onClick={() => navigate("/recommendations", { state: { prediction: predictionData } })}
      >
        View Recommended Products
      </button>
    </div>
  );
};

export default Results;
