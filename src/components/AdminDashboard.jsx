import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
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
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3031/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3031/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3031/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:3031/api/products", {
        ...newProduct,
        price: Number(newProduct.price),
      });
      setNewProduct({
        skinType: "",
        productName: "",
        concern: "",
        productUrl: "",
        productPic: "",
        price: "",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async () => {
    if (!editProduct) return;
    try {
      await axios.put(`http://localhost:3031/api/products/${editProduct._id}`, editProduct);
      setEditProduct(null);
      fetchProducts();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3031/api/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3031/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveSection("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveSection("products")}>Manage Products</li>
          <li onClick={() => setActiveSection("users")}>Manage Users</li>
          <li onClick={() => setActiveSection("orders")}>Manage Orders</li>
        </ul>
      </div>
      <div className="content">
        {activeSection === "dashboard" && <h2>Welcome to the Admin Dashboard</h2>}

        {activeSection === "products" && (
          <div>
            <h3>Manage Products</h3>
            <div className="add-product-form">
              <h4>Add New Product</h4>
              {Object.keys(newProduct).map((key) => (
                <input
                  key={key}
                  type={key === "price" ? "number" : "text"}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  value={newProduct[key]}
                  onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })}
                />
              ))}
              <button onClick={addProduct}>Add Product</button>
            </div>

            {/* Edit Product Form */}
            {editProduct && (
              <div className="edit-product-form">
                <h4>Edit Product</h4>
                <input type="text" placeholder="Skin Type" value={editProduct.skinType} onChange={(e) => setEditProduct({ ...editProduct, skinType: e.target.value })} />
                <input type="text" placeholder="Product Name" value={editProduct.productName} onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })} />
                <input type="text" placeholder="Concern" value={editProduct.concern} onChange={(e) => setEditProduct({ ...editProduct, concern: e.target.value })} />
                <input type="text" placeholder="Product URL" value={editProduct.productUrl} onChange={(e) => setEditProduct({ ...editProduct, productUrl: e.target.value })} />
                <input type="text" placeholder="Product Image URL" value={editProduct.productPic} onChange={(e) => setEditProduct({ ...editProduct, productPic: e.target.value })} />
                <input type="number" placeholder="Price" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
                <button onClick={updateProduct}>Update Product</button>
                <button onClick={() => setEditProduct(null)}>Cancel</button>
              </div>
            )}

            <ul>
              {products.slice(0, visibleCount).map((product) => (
                <li key={product._id} className="product-item">
                  <div className="product-info">
                    <strong>{product.productName}</strong>
                    <span>${product.price}</span>
                    <span>({product.concern})</span>
                  </div>
                  <div className="button-container">
                    <button onClick={() => setEditProduct(product)}>Edit</button>
                    <button onClick={() => deleteProduct(product._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>

            {visibleCount < products.length && (
              <button onClick={() => setVisibleCount((prev) => prev + 10)}>Show More</button>
            )}
          </div>
        )}

{activeSection === "users" && (
  <div>
    <h3>Manage Users</h3>
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.username} - {user.email}
          <button onClick={() => deleteUser(user._id)} style={{ marginLeft: "10px", color: "red" }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
)}
     

        {activeSection === "orders" && (
          <div>
            <h3>Manage Orders</h3>
            <ul>
              {orders.map((order) => (
                <li key={order._id}>Order ID: {order._id} - Status: {order.status}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;