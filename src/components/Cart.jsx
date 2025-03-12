import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart loaded from localStorage: ", storedCart);
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    console.log("Cart updated: ", updatedCart);
  };

  const proceedToOrderSummary = () => {
    // Navigate to Order Summary with cart data passed through state
    navigate("/order-summary", { state: { cart } });
  };

  // Log cart to track any unexpected changes
  useEffect(() => {
    console.log("Current cart state: ", cart);
  }, [cart]);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <ul className="cart-items">
          {cart.map((product) => (
            <li key={product._id} className="cart-item">
              <h4>{product.productName}</h4>
              <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
              {product.productPic && <img src={product.productPic} alt={product.productName} className="product-image" />}
              <br />
              <button onClick={() => removeFromCart(product._id)} className="remove-button">
                Remove from Cart
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cart.length > 0 && (
        <button onClick={proceedToOrderSummary} className="checkout-button">
          Proceed to Order
        </button>
      )}

      <style jsx>{`
        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .cart-container h1 {
          font-size: 2.5rem;
          color: #343a40;
        }

        .cart-items {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .cart-item {
          margin-bottom: 15px;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f9f9f9;
        }

        .cart-item h4 {
          font-size: 1.5rem;
          color: #007bff;
        }

        .cart-item p {
          font-size: 1.1rem;
          color: #555;
        }

        .product-image {
          max-width: 100px;
          margin-top: 10px;
          border-radius: 5px;
          object-fit: cover;
        }

        .remove-button, .checkout-button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }

        .remove-button {
          background-color: red;
          margin-top: 10px;
        }

        .remove-button:hover {
          background-color: darkred;
        }

        .checkout-button {
          background-color: blue;
          margin-top: 20px;
        }

        .checkout-button:hover {
          background-color: darkblue;
        }

        .cart-container p {
          font-size: 1.2rem;
          color: #777;
        }
      `}</style>
    </div>
  );
}

export default Cart;
