import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get recommended products from state or localStorage
  const { recommendedProducts } = location.state || {};
  const finalRecommendedProducts = recommendedProducts || JSON.parse(localStorage.getItem("recommendedProducts")) || [];

  console.log("Final Recommended Products:", finalRecommendedProducts);

  // Function to add products to cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get existing cart or empty array
    cart.push(product); // Add new product
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    alert(`${product.productName} added to cart!`);
  };

  return (
    <div style={styles.container}>
      <h1>Recommended Products</h1>
      {finalRecommendedProducts.length > 0 ? (
        <ul style={styles.productList}>
          {finalRecommendedProducts.map((product) => (
            <li key={product._id} style={styles.productItem}>
              <h4>{product.productName}</h4>
              <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
              <p><strong>Price:</strong> ${product.price.toFixed(2)}</p> {/* Display the price */}
              {product.productPic && <img src={product.productPic} alt={product.productName} style={styles.productImage} />}
              <br />
              {product.productUrl && <a href={product.productUrl} target="_blank" rel="noopener noreferrer" style={styles.productLink}>View Product</a>}
              <br />
              <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommended products available.</p>
      )}

      <button onClick={() => navigate("/cart")} style={styles.goToCartBtn}>
        Go to Cart
      </button>
    </div>
  );
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
  productLink: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px",
  },
  addToCartBtn: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  goToCartBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Products;
