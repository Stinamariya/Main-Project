import { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = ({ productId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    skinType: "",
    productName: "",
    concern: "",
    productURL: "",
    imageURL: ""
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
        <button type="submit">Update Product</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
