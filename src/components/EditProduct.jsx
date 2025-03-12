import { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = ({ productId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    skinType: "",
    productName: "",
    concern: "",
    productURL: "",
    imageURL: "",
    price:""
  });

  // Fetch existing product details
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/products/${productId}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [productId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/admin/products/${productId}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      onUpdate(); // Refresh product list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="modal">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="skinType" value={formData.skinType} onChange={handleChange} placeholder="Skin Type" required />
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" required />
        <input type="text" name="concern" value={formData.concern} onChange={handleChange} placeholder="Concern" required />
        <input type="text" name="productURL" value={formData.productURL} onChange={handleChange} placeholder="Product URL" required />
        <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="Image URL" required />
        <input type="text" name="price" value={formData.Price} onChange={handleChange} placeholder="PriceL" required />
        <button type="submit">Update Product</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        form {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 14px;
        }

        button {
          width: 100%;
          padding: 12px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #45a049;
        }

        button[type="button"] {
          background-color: #f44336;
        }

        button[type="button"]:hover {
          background-color: #e53935;
        }
      `}</style>
    </div>
  );
};

export default EditProduct;
