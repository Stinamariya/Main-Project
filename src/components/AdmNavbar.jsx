import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUsers, FaSignOutAlt } from "react-icons/fa"; // Admin-specific icons

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); // Remove authentication token
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Admin Dashboard</h2>
      <div style={styles.links}>
        <Link to="/admin" style={styles.link}>
          <FaTachometerAlt style={styles.icon} /> Dashboard
        </Link>
        <Link to="/admin/users" style={styles.link}>
          <FaUsers style={styles.icon} /> Manage Users
        </Link>
        <Link to="/admin/products" style={styles.link}>
          <FaBox style={styles.icon} /> Manage Products
        </Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.icon} /> Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#333",
    padding: "20px",
    color: "white",
    height: "100vh", // Make the navbar take the full height
    width: "200px", // Fixed width for the sidebar
    position: "fixed", // Fix the navbar on the left
  },
  logo: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#444",
  },
  logoutButton: {
    color: "white",
    backgroundColor: "#dc3545",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
  },
};

export default AdminNavbar;
