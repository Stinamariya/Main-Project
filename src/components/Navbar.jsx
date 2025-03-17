import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa"; // Import icons

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token"); // Ensure boolean value

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); // Remove authentication token
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Skincare Assistant</h2>
      <div style={styles.links}>
        <NavLink to="/" icon={<FaHome />} label="Home" location={location} />
        <NavLink to="/cart" icon={<FaShoppingCart />} label="Cart" location={location} />

        {isAuthenticated ? (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.signupButton}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Helper component for nav links with active state
const NavLink = ({ to, icon, label, location }) => {
  const isActive = location.pathname === to;
  return (
    <Link to={to} style={{ ...styles.link, fontWeight: isActive ? "bold" : "normal" }}>
      {icon} {label}
    </Link>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "15px 30px",
    color: "white",
  },
  logo: {
    fontSize: "1.5rem",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    textDecoration: "none",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;
