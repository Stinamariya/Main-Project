import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [newProduct, setNewProduct] = useState({
      skinType: "",
      productName: "",
      concern: "",
      productUrl: "",
      productPic: "",
      price: "",
    });
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3031/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const handleLoadMore = () => {
      setVisibleCount((prevCount) => prevCount + 10);
    };

    const addProduct = async () => {
      try {
        await axios.post("http://localhost:3031/api/products", newProduct);
        fetchProducts();
        setNewProduct({ skinType: "", productName: "", concern: "", productUrl: "", productPic: "", price: "" });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

    const updateProduct = async () => {
      try {
        await axios.put(`http://localhost:3031/api/products/${editProduct._id}`, editProduct);
        setEditProduct(null);
        fetchProducts();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };

    const deleteProduct = async (productId) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        try {
          await axios.delete(`http://localhost:3031/api/products/${productId}`);
          fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    };

    return (
      <div style={styles.section}>
        <h3 style={styles.heading}>Manage Products</h3>

        <ul style={styles.list}>
          {products.slice(0, visibleCount).map((product) => (
            <li key={product._id} style={styles.listItem}>
              {product.productName} - ${product.price} ({product.concern})
              <button style={{ ...styles.button, backgroundColor: "#e74c3c" }} onClick={() => setEditProduct(product)}>Edit</button>
              <button style={{ ...styles.button, backgroundColor: "#c0392b" }} onClick={() => deleteProduct(product._id)}>Delete</button>
            </li>
          ))}
        </ul>

        {visibleCount < products.length && <button style={styles.loadMore} onClick={handleLoadMore}>Load More</button>}

        <h3 style={styles.heading}>Add New Product</h3>
        {Object.keys(newProduct).map((key) => (
          <input
            key={key}
            type={key === "price" ? "number" : "text"}
            placeholder={key.replace(/([A-Z])/g, " $1").trim()}
            value={newProduct[key]}
            onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
            style={styles.input}
          />
        ))}
        <button style={styles.button} onClick={addProduct}>Add Product</button>

        {editProduct && (
  <div style={styles.editProduct}>
    <h3 style={styles.heading}>Edit Product</h3>
    
    <input
      type="text"
      value={editProduct.productName}
      onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
      style={styles.input}
    />
    <input
      type="number"
      value={editProduct.price}
      onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
      style={styles.input}
    />
    <input
      type="text"
      value={editProduct.concern}
      onChange={(e) => setEditProduct({ ...editProduct, concern: e.target.value })}
      style={styles.input}
    />

    {/* Ensure Update Button is Visible */}
    <button 
      style={{ ...styles.button, display: "block" }} 
      onClick={updateProduct}
    >
      Update
    </button>

    <button 
      style={{ ...styles.button, backgroundColor: "#95a5a6", display: "block" }} 
      onClick={() => setEditProduct(null)}
    >
      Cancel
    </button>
          </div>
        )}
      </div>
    );
};

// Embedded CSS
const styles = {
  section: { padding: "20px", maxWidth: "600px", margin: "auto", backgroundColor: "#f8f8f8", borderRadius: "10px" },
  heading: { textAlign: "center", marginBottom: "10px" },
  list: { listStyleType: "none", padding: 0 },
  listItem: { padding: "10px", backgroundColor: "#fff", marginBottom: "10px", borderRadius: "5px", display: "flex", justifyContent: "space-between" },
  button: { padding: "8px 12px", border: "none", color: "white", cursor: "pointer", borderRadius: "5px" },
  loadMore: { display: "block", margin: "10px auto", backgroundColor: "#3498db", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" },
  input: { display: "block", width: "100%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" },
  editProduct: { backgroundColor: "#ecf0f1", padding: "15px", borderRadius: "10px", marginTop: "20px" },
};

export default ProductManagement;
