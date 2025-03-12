import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast, Button, Table, Form, Modal } from "react-bootstrap";

const API_BASE_URL = "http://localhost:3031";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({
    skinType: "",
    productName: "",
    concern: "",
    productURL: "",
    imageURL: "",
    price: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [productLimit, setProductLimit] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, productsRes, ordersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/users`, { headers }),
        axios.get(`${API_BASE_URL}/admin/products`, { headers }),
        axios.get(`${API_BASE_URL}/admin/orders`, { headers }),
      ]);

      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Signup";
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(`${API_BASE_URL}/admin/products`, newProduct, { headers });
      showToastMessage("Product added successfully!");
      setNewProduct({
        skinType: "",
        productName: "",
        concern: "",
        productURL: "",
        imageURL: "",
        price: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${API_BASE_URL}/admin/products/${productId}`, { headers });
      showToastMessage("Product deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product._id);
    setEditedProduct({ ...product });
    setShowEditModal(true);
  };

  const handleEditProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`${API_BASE_URL}/admin/products/${editingProduct}`, editedProduct, { headers });
      showToastMessage("Product updated successfully!");
      setEditingProduct(null);
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container mt-4">
        <h1>Admin Dashboard</h1>
        <h2 className="mt-4">Users</h2>
        <Table striped bordered hover>
          <thead>
            <tr><th>Username</th><th>Email</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}><td>{user.username}</td><td>{user.email}</td></tr>
            ))}
          </tbody>
        </Table>

        <h2 className="mt-4">Products</h2>
        <Table striped bordered hover>
          <thead>
            <tr><th>Image</th><th>Product Name</th><th>Concern</th><th>Skin Type</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.slice(0, productLimit).map((product) => (
              <tr key={product._id}>
                <td><img src={product.imageURL?.trim() ? product.imageURL : "https://placehold.co/100x100"} width="100" height="100" alt={product.productName} /></td>
                <td>{product.productName}</td>
                <td>{product.concern}</td>
                <td>{product.skinType}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditProductClick(product)}>Edit</Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {products.length > 5 && (
          <Button onClick={() => setProductLimit(productLimit === 5 ? products.length : 5)}>
            {productLimit === 5 ? "Show More" : "Show Less"}
          </Button>
        )}

        <h2 className="mt-4">Add Product</h2>
        <Form onSubmit={handleAddProduct}>
          {Object.keys(newProduct).map((key) => (
            <Form.Control key={key} type="text" placeholder={key} value={newProduct[key]} onChange={(e) => setNewProduct({ ...newProduct, [key]: e.target.value })} className="mb-2" required />
          ))}
          <Button type="submit">Add Product</Button>
        </Form>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton><Modal.Title>Edit Product</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(editedProduct).map((key) => (
              <Form.Control key={key} type="text" value={editedProduct[key]} onChange={(e) => setEditedProduct({ ...editedProduct, [key]: e.target.value })} className="mb-2" />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleEditProduct}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;