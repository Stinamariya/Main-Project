import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaShoppingCart, FaComments } from "react-icons/fa"; // Import feedback icon

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
      <h2 style={styles.logo}>Personal Skincare Assistant</h2>
      <div style={styles.links}>
        <NavLink to="/" icon={<FaHome />} label="Home" location={location} />
        {/* <NavLink to="/cart" icon={<FaShoppingCart />} label="Cart" location={location} /> */}
        <NavLink to="/feedback" icon={<FaComments />} label="Feedback" location={location} /> {/* Add Feedback Link */}

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
    backgroundColor: "#222",
    padding: "15px 30px",
    color: "white",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#28a745", // Green color for the logo
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#f8f9fa",
    textDecoration: "none",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  signupButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  // Hover effects for links and buttons
  linkHover: {
    backgroundColor: "#28a745", // Green hover for links
    color: "#fff",
  },
  signupHover: {
    backgroundColor: "#218838", // Darker green hover for signup button
  },
  logoutHover: {
    backgroundColor: "#c82333", // Darker red hover for logout button
  },
};

export default Navbar;
