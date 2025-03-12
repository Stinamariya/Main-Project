import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // Import CartContext

const ProductList = () => {
    const { addToCart } = useContext(CartContext); // ✅ Correct placement inside the component
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={styles.productList}>
            {products.map((product) => (
                <div key={product._id} style={styles.productCard}>
                    <img src={product.imageUrl} alt={product.productName} style={styles.productImage} />
                    <h2 style={styles.productName}>{product.productName}</h2>
                    <p style={styles.productDescription}>{product.description}</p>
                    <p style={styles.productPrice}>${product.price}</p>
                    <button 
                        onClick={() => addToCart(product)} 
                        style={styles.addToCartBtn}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

const styles = {
    productList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1.5rem",
        padding: "1rem",
    },
    productCard: {
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
    },
    productImage: {
        width: "100%",
        height: "160px",
        objectFit: "cover",
        borderRadius: "6px",
        marginBottom: "1rem",
    },
    productName: {
        fontSize: "1.125rem",
        fontWeight: "600",
        color: "#333",
        marginBottom: "0.5rem",
    },
    productDescription: {
        color: "#666",
        marginBottom: "1rem",
    },
    productPrice: {
        color: "#28a745",
        fontWeight: "600",
        marginBottom: "1.25rem",
    },
    addToCartBtn: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "0.5rem 1.5rem",
        border: "none",
        borderRadius: "6px",
        width: "100%",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};

export default ProductList;
