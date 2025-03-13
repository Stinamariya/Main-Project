import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li onClick={() => navigate("/admin/products")}>Manage Products</li>
        <li onClick={() => navigate("/admin/users")}>Manage Users</li>
        <li onClick={() => navigate("/admin/orders")}>Manage Orders</li>
        <li onClick={() => navigate("/")}>Go to Home</li>
      </ul>
    </div>
  );
};

export default Sidebar;
