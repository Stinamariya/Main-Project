import React from "react";
import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Products</h2>
      <ul style={styles.productList}>
        {products.map((product) => (
          <li key={product.id} style={styles.productItem}>
            <strong style={styles.productName}>{product.productName}</strong>
            <br />
            <a 
              href={product.productUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.productLink}
            >
              View Product
            </a>
            <br />
            <button 
              onClick={() => addToCart(product)} 
              style={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  productList: {
    listStyleType: "none",
    padding: 0,
  },
  productItem: {
    marginBottom: "15px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  productLink: {
    color: "#007bff",
    textDecoration: "none",
    marginTop: "5px",
    display: "inline-block",
  },
  addToCartButton: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductList;
