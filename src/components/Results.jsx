import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { predictedSkinType, predictedSkinCondition } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch recommendations whenever predictedSkinType or predictedSkinCondition change
  useEffect(() => {
    if (!predictedSkinType || !predictedSkinCondition) {
      setError("Missing Skin Data. Please fill out the form again.");
      return;
    }
    fetchRecommendedProducts(predictedSkinType, predictedSkinCondition);
  }, [predictedSkinType, predictedSkinCondition]);

  const fetchRecommendedProducts = async (skinType, skinCondition) => {
    setLoading(true);
    setError("");

    console.log("Sending data to backend:", { skin_type: skinType, skin_condition: skinCondition });

    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skin_type: skinType, skin_condition: skinCondition }),
        mode: "cors",
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend Response:", data);
      setProducts(data.recommended_products || []);
    } catch (error) {
      console.error("Network Error:", error);
      setError(`Network error: ${error.message}. Please check if the backend is running.`);
    }
    setLoading(false);
  };

  return (
    <div className="results-container">
      <h2>Skin Analysis Result</h2>
      <p><strong>Predicted Skin Type:</strong> {predictedSkinType || "Data not available"}</p>
      <p><strong>Predicted Skin Condition:</strong> {predictedSkinCondition || "Data not available"}</p>

      {/* Button to reload recommendations, if needed */}
      <button 
        onClick={() => fetchRecommendedProducts(predictedSkinType, predictedSkinCondition)} 
        disabled={loading}
        className="recommendation-button"
      >
        {loading ? "Loading..." : "Show Recommended Products"}
      </button>

      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Render product recommendations */}
      {products.length > 0 ? (
        <div className="products-list">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <img 
                src={product.product_pic || "fallback-image.jpg"} 
                alt={product.Product} 
                className="product-image"
              />
              <div className="product-details">
                <p><strong>{product.Product}</strong></p>
                <p>{product.Concern}</p>
                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for your skin type and condition.</p>
      )}
    </div>
  );
};

export default Results;
