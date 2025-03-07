import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};

  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    if (!prediction?.predictedSkinType || !prediction?.predictedSkinCondition) {
      navigate("/results");
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3031/api/recommend?skinType=${prediction.predictedSkinType}&skinCondition=${prediction.predictedSkinCondition}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [prediction, navigate]);

  return (
    <div className="container">
      <h2>Recommended Skincare Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found for your skin type and condition.</p>
      )}
    </div>
  );
};

export default Recommendations;
