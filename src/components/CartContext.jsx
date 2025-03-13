import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add to Cart
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    // Remove from Cart
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item._id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
