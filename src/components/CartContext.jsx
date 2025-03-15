import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // Retrieve userId when app loads
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Retrieved UserID:", storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Load cart from localStorage when userId is set
  useEffect(() => {
    if (userId) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      console.log("Loaded Cart from localStorage:", storedCart);
      setCart(storedCart);
    }
  }, [userId]); // Ensure it runs when userId changes

  // Save cart when cart state changes
  useEffect(() => {
    if (userId) {
      console.log("Saving Cart:", cart);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, userId]);

  // Function to add items to the cart
  const addToCart = (newProduct) => {
    setCart((prevCart) => {
      const isDuplicate = prevCart.some((item) => item._id === newProduct._id);
      return isDuplicate ? prevCart : [...prevCart, newProduct];
    });
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
