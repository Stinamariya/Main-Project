import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const initialSelection = storedCart.reduce((acc, product) => {
        acc[product._id] = { selected: false, quantity: 1 };
        return acc;
      }, {});
      setCart(storedCart);
      setSelectedItems(initialSelection);
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, [userId]);

  const handleSelectItem = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], selected: !prev[productId].selected },
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], quantity: newQuantity },
    }));
  };

  const handleCheckout = () => {
    const selectedProducts = cart
      .filter((product) => selectedItems[product._id]?.selected)
      .map((product) => ({
        ...product,
        quantity: selectedItems[product._id].quantity,
      }));

    if (selectedProducts.length === 0) {
      alert("Please select at least one item to checkout!");
      return;
    }

    localStorage.setItem(`checkout_${userId}`, JSON.stringify(selectedProducts));
    navigate("/checkout");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul style={styles.list}>
            {cart.map((product) => (
              <li key={product._id} style={styles.productCard}>
                <div style={styles.productInfo}>
                  <input
                    type="checkbox"
                    checked={selectedItems[product._id]?.selected || false}
                    onChange={() => handleSelectItem(product._id)}
                    style={styles.checkbox}
                  />
                  <div style={styles.details}>
                    <h4 style={styles.productName}>{product.productName}</h4>
                    <p style={styles.text}><strong>Concern:</strong> {product.concern || "N/A"}</p>
                    <p style={styles.text}><strong>Price:</strong> ₹{product.price ? product.price.toFixed(2) : "N/A"}</p>
                    <div style={styles.quantityControl}>
                      <button style={styles.button} onClick={() => handleQuantityChange(product._id, selectedItems[product._id].quantity - 1)}>-</button>
                      <span style={styles.quantity}>{selectedItems[product._id]?.quantity || 1}</span>
                      <button style={styles.button} onClick={() => handleQuantityChange(product._id, selectedItems[product._id].quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
                {product.productPic && (
                  <img src={product.productPic} alt={product.productName} style={styles.image} />
                )}
              </li>
            ))}
          </ul>
          <h3 style={styles.total}>
            Total: ₹
            {cart
              .filter((product) => selectedItems[product._id]?.selected)
              .reduce((sum, product) => sum + (product.price || 0) * (selectedItems[product._id]?.quantity || 1), 0)
              .toFixed(2)}
          </h3>
          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      )}
    </div>
  );
}

// Inline CSS styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "auto",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  productCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
  },
  productInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  details: {
    flex: 1,
  },
  checkbox: {
    transform: "scale(1.3)",
    cursor: "pointer",
  },
  productName: {
    margin: "5px 0",
    fontSize: "18px",
    color: "#333",
  },
  text: {
    margin: "2px 0",
    color: "#555",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "5px",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "5px",
    fontSize: "16px",
  },
  quantity: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  total: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginTop: "20px",
  },
  checkoutButton: {
    display: "block",
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "18px",
    marginTop: "15px",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: "18px",
    color: "#888",
  },
};

export default Cart;
