import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: "",
        price: "",
        concern: "",
    });

    // Fetch product details when component loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3031/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    // Update product function
    const updateProduct = async () => {
        try {
            await axios.put(`http://localhost:3031/api/products/${id}`, product);
            navigate("/products"); // Redirect back to products list
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="edit-section">
            <h2>Edit Product</h2>
            <input
                type="text"
                value={product.productName}
                onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                placeholder="Product Name"
            />
            <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="Price"
            />
            <input
                type="text"
                value={product.concern}
                onChange={(e) => setProduct({ ...product, concern: e.target.value })}
                placeholder="Concern"
            />
            <button onClick={updateProduct}>Update</button>
            <button onClick={() => navigate("/products")}>Cancel</button>
        </div>
    );
};

export default EditProduct;
