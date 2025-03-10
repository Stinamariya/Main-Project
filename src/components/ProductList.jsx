import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <div>
                {products.map(product => (
                    <div key={product._id}>
                        <img src={product.image} alt={product.name} width="100" />
                        <h3>{product.name}</h3>
                        <p>{product.skin_type} | {product.skin_condition}</p>
                        <p>₹{product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
