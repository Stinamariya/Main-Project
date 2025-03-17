import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productPic, setProductPic] = useState("");
  const [price, setPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3031/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async () => {
    if (!productName || !skinType || !concern || !productUrl || !productPic || !price) {
      alert("All fields are required!");
      return;
    }

    const productData = {
      productName,
      skinType,
      concern,
      productUrl,
      productPic,
      price: Number(price),
    };

    try {
      await axios.post("http://localhost:3031/api/products", productData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Product added successfully! ");
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3031/api/products/${id}`);
      alert("Product deleted successfully! ");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductName(product.productName);
    setSkinType(product.skinType);
    setConcern(product.concern);
    setProductUrl(product.productUrl);
    setProductPic(product.productPic);
    setPrice(product.price);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const updateProduct = async () => {
    if (!editingProduct) return;

    const updatedProduct = {
      productName,
      skinType,
      concern,
      productUrl,
      productPic,
      price: Number(price),
    };

    try {
      await axios.put(`http://localhost:3031/api/products/${editingProduct._id}`, updatedProduct, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Product updated successfully! ✅");
      closeEditModal();
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const resetForm = () => {
    setProductName("");
    setSkinType("");
    setConcern("");
    setProductUrl("");
    setProductPic("");
    setPrice("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Products</h2>

      {/* Button to go back to Admin Dashboard */}
      <button onClick={() => navigate("/admin-dashboard")} style={styles.button}>
        Back
      </button>

      {/* Add Product Form */}
      <div style={styles.formContainer}>
        <input style={styles.input} type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
        <select style={styles.select} value={skinType} onChange={(e) => setSkinType(e.target.value)}>
          <option value="">Select Skin Type</option>
          <option value="dry">Dry</option>
          <option value="oily">Oily</option>
          <option value="combination">Combination</option>
          <option value="normal">Normal</option>
        </select>
        <input style={styles.input} type="text" value={concern} onChange={(e) => setConcern(e.target.value)} placeholder="Concern" />
        <input style={styles.input} type="text" value={productUrl} onChange={(e) => setProductUrl(e.target.value)} placeholder="Product URL" />
        <input style={styles.input} type="text" value={productPic} onChange={(e) => setProductPic(e.target.value)} placeholder="Product Image URL" />
        <input style={styles.input} type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

        <button style={styles.addButton} onClick={addProduct}>Add Product</button>
        <button style={styles.resetButton} onClick={resetForm}>Reset</button>
      </div>

      {/* Product List */}
      <ul style={styles.productList}>
  {products.map((product) => (
    <li key={product._id} style={styles.productItem}>
      <span>
        <strong>{product.productName}</strong> - {product.skinType} - ${product.price}
      </span>
      <div> {/* Button Container */}
        <button style={styles.editButton} onClick={() => openEditModal(product)}>Edit</button>
        <button style={styles.deleteButton} onClick={() => deleteProduct(product._id)}>Delete</button>
      </div>
    </li>
  ))}
</ul>


      {/* Edit Product Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Product</h3>
            <input style={styles.input} type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
            <select style={styles.select} value={skinType} onChange={(e) => setSkinType(e.target.value)}>
              <option value="dry">Dry</option>
              <option value="oily">Oily</option>
              <option value="combination">Combination</option>
              <option value="normal">Normal</option>
            </select>
            <input style={styles.input} type="text" value={concern} onChange={(e) => setConcern(e.target.value)} placeholder="Concern" />
            <input style={styles.input} type="text" value={productUrl} onChange={(e) => setProductUrl(e.target.value)} placeholder="Product URL" />
            <input style={styles.input} type="text" value={productPic} onChange={(e) => setProductPic(e.target.value)} placeholder="Product Image URL" />
            <input style={styles.input} type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

            <button style={styles.updateButton} onClick={updateProduct}>Update</button>
            <button style={styles.closeButton} onClick={closeEditModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  button: {
    marginBottom: "15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  formContainer: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  select: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  resetButton: {
    backgroundColor: "#f0ad4e",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  productList: {
    listStyleType: "none",
    padding: 0,
  },
  productItem: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    display: "flex",           // Add flexbox
    justifyContent: "space-between", // Distribute space evenly
    alignItems: "center",       // Align items vertically
  },
  
  editButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  closeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default ManageProducts;
