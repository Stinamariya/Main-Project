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
    <div>
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((product) => (
              <li key={product._id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectedItems[product._id]?.selected || false}
                  onChange={() => handleSelectItem(product._id)}
                />
                <h4>{product.productName}</h4>
                <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
                <p><strong>Price:</strong> ₹{product.price ? product.price.toFixed(2) : "N/A"}</p>
                <div>
                  <button onClick={() => handleQuantityChange(product._id, selectedItems[product._id].quantity - 1)}>-</button>
                  <span> {selectedItems[product._id]?.quantity || 1} </span>
                  <button onClick={() => handleQuantityChange(product._id, selectedItems[product._id].quantity + 1)}>+</button>
                </div>
                {product.productPic && (
                  <img src={product.productPic} alt={product.productName} style={{ width: "100px", height: "100px" }} />
                )}
              </li>
            ))}
          </ul>
          <h3>
            Total: ₹
            {cart
              .filter((product) => selectedItems[product._id]?.selected)
              .reduce((sum, product) => sum + (product.price || 0) * (selectedItems[product._id]?.quantity || 1), 0)
              .toFixed(2)}
          </h3>
          <button onClick={handleCheckout} style={{ padding: "10px", background: "green", color: "white" }}>
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}




// Inline CSS styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  productCard: {
    marginBottom: "10px",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
  },
  checkbox: {
    marginRight: "10px",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#ddd",
    borderRadius: "5px",
  },
  image: {
    width: "100px",
    height: "100px",
    marginTop: "10px",
  },
  link: {
    display: "block",
    marginTop: "5px",
    color: "blue",
    textDecoration: "none",
  },
  checkoutButton: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default Cart;
