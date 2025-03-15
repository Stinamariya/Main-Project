













import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve recommended products and prediction results from state
  const { recommendedProducts, skinType, skinCondition } = location.state || {};

  // Fallback to localStorage if the state is missing
  const recommendedProductsFromLocalStorage = localStorage.getItem("recommendedProducts");
  const finalRecommendedProducts =
    recommendedProducts ||
    (recommendedProductsFromLocalStorage && isValidJSON(recommendedProductsFromLocalStorage)
      ? JSON.parse(recommendedProductsFromLocalStorage)
      : []);

  const predictedSkinType = skinType || localStorage.getItem("predictedSkinType") || "";
  const predictedSkinCondition = skinCondition || localStorage.getItem("predictedSkinCondition") || "";

  // Filter products based on predicted skin type and condition
  const filteredProducts = finalRecommendedProducts.filter(
    (product) =>
      product?.skinType?.toLowerCase() === predictedSkinType.toLowerCase() &&
      product?.concern?.toLowerCase() === predictedSkinCondition.toLowerCase()
  );

  // Function to add products to cart without navigating to cart page
  const addToCart = (product) => {
    const userId = localStorage.getItem("userId"); // Get logged-in user's ID

    if (!userId) {
      alert("Please log in first!");
      navigate("/login"); // Redirect to login if user is not authenticated
      return;
    }

    let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity
      alert("Quantity updated in the cart!");
    } else {
      product.quantity = 1; // Add new product with quantity
      cart.push(product);
      alert("Added to cart!");
    }

    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    console.log("Cart Updated:", cart);
  };

  return (
    <div style={styles.container}>
      <h1>Recommended Products</h1>
      {filteredProducts.length > 0 ? (
        <ul style={styles.productList}>
          {filteredProducts.map((product) => (
            <li key={product._id} style={styles.productItem}>
              <h4>{product.productName}</h4>
              <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
              <p><strong>Price:</strong> ${product.price ? product.price.toFixed(2) : "N/A"}</p>
              {product.productPic && (
                <img src={product.productPic} alt={product.productName} style={styles.productImage} />
              )}
              <br />
              <button
                onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
                style={styles.viewDetailsBtn}
              >
                View Details
              </button>
              <br />
              <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommended products available for your skin type and concern.</p>
      )}

      <button onClick={() => navigate("/cart")} style={styles.goToCartBtn}>
        Go to Cart
      </button>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ⬅ Go Back
      </button>
    </div>
  );
}

// Function to check if a string is valid JSON
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  productList: {
    listStyleType: "none",
    padding: 0,
  },
  productItem: {
    marginBottom: "15px",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
    marginTop: "10px",
  },
  viewDetailsBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  addToCartBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  goToCartBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  backBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Products;

