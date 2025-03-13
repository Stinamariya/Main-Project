import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-grid">
                        {cart.map((product) => (
                            <div key={product._id} className="cart-item">
                                <img src={product.imageUrl} alt={product.name} />
                                <div>
                                    <h3>{product.name}</h3>
                                    <p>${product.price}</p>
                                    <button onClick={() => removeFromCart(product._id)}>
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <button onClick={() => navigate("/checkout")}>
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage;
