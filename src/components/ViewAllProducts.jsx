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
        <div className="product-container">
            <h2>All Products ({products.length})</h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <img src={product.product_image_url} alt={product.product_name} className="product-image" />
                            <h3>{product.product_name}</h3>
                            <p><strong>Skin Type:</strong> {product.skin_type}</p>
                            <p><strong>Concern:</strong> {product.concern}</p>
                            <a href={product.product_url} target="_blank" rel="noopener noreferrer" className="view-link">View Product</a>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            <style jsx>{`
                .product-container {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }

                h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    padding: 10px;
                }

                .product-item {
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .product-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .product-image {
                    width: 100%;
                    height: auto;
                    max-width: 150px;
                    margin-bottom: 15px;
                }

                .view-link {
                    color: #4CAF50;
                    text-decoration: none;
                    font-weight: bold;
                    transition: color 0.3s ease;
                }

                .view-link:hover {
                    color: #45a049;
                }

                @media (max-width: 768px) {
                    .product-grid {
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    }
                }

                @media (max-width: 480px) {
                    .product-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ViewAllProducts;
