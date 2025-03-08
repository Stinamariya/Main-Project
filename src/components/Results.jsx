import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  console.log("Location State:", location.state);  // Log the state

  const { predictedSkinType, predictedSkinCondition } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("🔹 Received Props from Location:", { predictedSkinType, predictedSkinCondition });

    // If skin type or condition is missing, show an error
    if (!predictedSkinType || !predictedSkinCondition) {
      setError("❌ Missing Skin Data. Please fill the form again.");
      return;
    }

    // Fetch recommended products if we have valid skin type and condition
    fetchRecommendedProducts();
  }, [predictedSkinType, predictedSkinCondition]);

  const fetchRecommendedProducts = async () => {
    setLoading(true);
    setError("");  // Reset error state before fetching

    try {
      console.log("🔹 Sending API Request:", { predictedSkinType, predictedSkinCondition });

      const response = await fetch("http://localhost:5000/recommend", {  // Fixed URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skin_type: predictedSkinType,
          skin_condition: predictedSkinCondition,
        }),
      });

      const data = await response.json();
      console.log("🔹 API Response:", data);

      if (response.ok) {
        setProducts(data.recommended_products || []);
      } else {
        setError(data.error || "❌ Failed to fetch recommendations.");
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      setError("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Skin Analysis Result</h2>
      <p><strong>Predicted Skin Type:</strong> {predictedSkinType || "Data not available"}</p>
      <p><strong>Predicted Skin Condition:</strong> {predictedSkinCondition || "Data not available"}</p>

      <button onClick={fetchRecommendedProducts} disabled={loading}>
        {loading ? "Loading..." : "Show Recommended Products"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length > 0 ? (
        <div>
          <h3>Recommended Products</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                <img src={product.image_url || "fallback-image-url.jpg"} alt={product.name} width="100" />
                <p><strong>{product.name}</strong></p>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && !error && <p>No recommendations available yet.</p>
      )}
    </div>
  );
};

export default Results;
