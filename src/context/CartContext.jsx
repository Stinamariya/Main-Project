import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

// Cart Page Component
const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div style={styles.cartContainer}>
      <h2 style={styles.cartHeader}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product._id} style={styles.cartItem}>
              <img src={product.product_image_url} alt={product.product_name} style={styles.cartItemImage} />
              <div style={styles.cartItemInfo}>
                <h3>{product.product_name}</h3>
                <p>Skin Type: {product.skin_type}</p>
                <p>Concern: {product.concern}</p>
                <p style={styles.cartItemPrice}>${product.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(product._id)}
                style={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div style={styles.cartSummary}>
          <h3>Total Items: {cart.length}</h3>
          <button style={styles.checkoutBtn}>Checkout</button>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  cartContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  cartHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cartItemImage: {
    width: "100px",
    height: "auto",
    marginRight: "10px",
  },
  cartItemInfo: {
    flexGrow: "1",
  },
  cartItemPrice: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  removeBtn: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  removeBtnHover: {
    backgroundColor: "#d32f2f",
  },
  cartSummary: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  checkoutBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default CartPage;
