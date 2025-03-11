import { useEffect, useState } from "react";
import axios from "axios";

const ViewAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then(response => {
                console.log("Total Products Fetched:", response.data.length);  // Debugging
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h2>All Products ({products.length})</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} style={{ border: "1px solid black", padding: "10px" }}>
                            <img src={product.product_image_url} alt={product.product_name} width="100" />
                            <h3>{product.product_name}</h3>
                            <p>Skin Type: {product.skin_type}</p>
                            <p>Concern: {product.concern}</p>
                            <a href={product.product_url} target="_blank" rel="noopener noreferrer">View Product</a>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewAllProducts;
