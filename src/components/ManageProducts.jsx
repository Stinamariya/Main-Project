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
  const [productsToShow, setProductsToShow] = useState(5); // Number of products to show initially

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNum) => {
    try {
      const res = await axios.get(`http://localhost:3031/api/products?page=${pageNum}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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

  const showMoreProducts = () => {
    setProductsToShow(productsToShow + 5); // Show 5 more products
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Products</h2>

      <button onClick={() => navigate("/admin-dashboard")} style={styles.backButton}>
        &larr; Back to Dashboard
      </button>

      <div style={styles.buttonContainer}>
        <button onClick={openAddModal} style={styles.addButton}>Add Product</button>
      </div>

      <div style={styles.productCardsContainer}>
        {products.slice(0, productsToShow).map((product) => (
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
        ))}
      </div>

      <div style={styles.paginationContainer}>
        {productsToShow < products.length && (
          <button onClick={showMoreProducts} style={styles.showMoreButton}>Show More</button>
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
            <button type="submit" style={styles.submitButton}>{isAdding ? "Add Product" : "Update Product"}</button>
            <button type="button" onClick={closeModal} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  backButton: {
    display: 'block',
    margin: '10px auto',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  productCardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    width: '200px',
    padding: '15px',
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  productInfo: {
    marginTop: '10px',
  },
  cardButtons: {
    marginTop: '10px',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  paginationContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  showMoreButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  select: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    height: '100px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ManageProducts;
