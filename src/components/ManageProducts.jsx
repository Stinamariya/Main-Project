import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal"; // Import React Modal

// Modal style
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    width: '90%',  // Adjusted width for better responsiveness
    maxWidth: '600px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [productName, setProductName] = useState("");
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [brand, setBrand] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [usageInstructions, setUsageInstructions] = useState("");
  const [benefits, setBenefits] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productPic, setProductPic] = useState("");
  const [price, setPrice] = useState("");
  const [isAdding, setIsAdding] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [page, setPage] = useState(1); // Pagination state
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products]); // Re-filter products whenever searchTerm or products change

  const fetchProducts = async (pageNum) => {
    try {
      const res = await axios.get(`http://localhost:3031/api/products?page=${pageNum}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.brand.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredProducts(filtered);
  };

  const addProduct = async () => {
    if (!productName || !skinType || !concern || !brand || !ingredients || !usageInstructions || !benefits || !productUrl || !productPic || !price) {
      alert("All fields are required!");
      return;
    }

    const productData = {
      productName,
      brand,
      skinType,
      concern,
      ingredients,
      usageInstructions,
      benefits,
      productUrl,
      productPic,
      price: Number(price),
    };

    try {
      await axios.post("http://localhost:3031/api/products", productData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Product added successfully!");
      resetForm();
      fetchProducts(page);
      closeModal(); // Close modal after adding the product
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3031/api/products/${id}`);
      alert("Product deleted successfully!");
      fetchProducts(page);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductName(product.productName);
    setBrand(product.brand);
    setSkinType(product.skinType);
    setConcern(product.concern);
    setIngredients(product.ingredients);
    setUsageInstructions(product.usageInstructions);
    setBenefits(product.benefits);
    setProductUrl(product.productUrl);
    setProductPic(product.productPic);
    setPrice(product.price);
    setIsAdding(false);
    setModalIsOpen(true); // Open modal
  };

  const openAddModal = () => {
    resetForm(); // Reset fields for the new product
    setIsAdding(true); // Indicate adding mode
    setModalIsOpen(true); // Open modal
  };

  const closeModal = () => {
    setModalIsOpen(false); // Close modal
    resetForm();
  };

  const updateProduct = async () => {
    if (!editingProduct) return;

    const updatedProduct = {
      productName,
      brand,
      skinType,
      concern,
      ingredients,
      usageInstructions,
      benefits,
      productUrl,
      productPic,
      price: Number(price),
    };

    try {
      await axios.put(`http://localhost:3031/api/products/${editingProduct._id}`, updatedProduct, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Product updated successfully!");
      fetchProducts(page);
      closeModal();
      setIsAdding(true);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const resetForm = () => {
    setProductName("");
    setBrand("");
    setSkinType("");
    setConcern("");
    setIngredients("");
    setUsageInstructions("");
    setBenefits("");
    setProductUrl("");
    setProductPic("");
    setPrice("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Products</h2>

      <button onClick={() => navigate("/admin-dashboard")} style={styles.backButton}>
        &larr; Back 
      </button>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products by name or brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button onClick={openAddModal} style={styles.addButton}>Add Product</button>
      </div>

      <div style={styles.productCardsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <img src={product.productPic} alt={product.productName} style={styles.productImage} />
              <div style={styles.productInfo}>
                <h3>{product.productName}</h3>
                <p>{product.skinType} Skin - {product.concern}</p>
                <p><strong>${product.price}</strong></p>
              </div>
              <div style={styles.cardButtons}>
                <button onClick={() => openEditModal(product)} style={styles.editButton}>Edit</button>
                <button onClick={() => deleteProduct(product._id)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Modal for adding or editing product */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
        <h2>{isAdding ? "Add Product" : "Edit Product"}</h2>
        <form onSubmit={(e) => { e.preventDefault(); isAdding ? addProduct() : updateProduct(); }} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
          <input
            style={styles.input}
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />
          <select style={styles.select} value={skinType} onChange={(e) => setSkinType(e.target.value)}>
          <option value="select">Select</option>
            <option value="dry">Dry</option>
            <option value="oily">Oily</option>
            <option value="combination">Combination</option>
            <option value="normal">Normal</option>
          </select>
          <input
            style={styles.input}
            type="text"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="Concern"
          />
          <textarea
            style={styles.textarea}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients"
          />
          <textarea
            style={styles.textarea}
            value={usageInstructions}
            onChange={(e) => setUsageInstructions(e.target.value)}
            placeholder="Usage Instructions"
          />
          <textarea
            style={styles.textarea}
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder="Benefits"
          />
          <input
            style={styles.input}
            type="text"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="Product URL"
          />
          <input
            style={styles.input}
            type="text"
            value={productPic}
            onChange={(e) => setProductPic(e.target.value)}
            placeholder="Product Image URL"
          />
          <input
            style={styles.input}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <div style={styles.modalButtons}>
            <button type="button" onClick={closeModal} style={styles.closeButton}>Close</button>
            <button type="submit" style={styles.submitButton}>
              {isAdding ? "Add Product" : "Update Product"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    paddingTop: '20px',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  backButton: {
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  productCardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  productInfo: {
    marginTop: '15px',
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  select: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ManageProducts;
