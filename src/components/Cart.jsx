import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = ({ userId }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/cart/${userId}`)
            .then(response => setCart(response.data.products))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2>Cart</h2>
            {cart.map(item => (
                <div key={item.productId}>
                    <img src={item.image} alt={item.name} width="50" />
                    <p>{item.name} - ₹{item.price} x {item.quantity}</p>
                </div>
            ))}
        </div>
    );
};

export default Cart;
