import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/login"); // Redirect to login
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Your Dashboard</h2>
      <div style={styles.cardContainer}>
        <Link to="/questionnaire" style={styles.card}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5IDuKjZNM2eKTm4Ox_FPrsQhEWSvxllFVQ&s" alt="questionnaire" style={styles.icon} />
          <h3>Know Your Skin</h3>
        </Link>

        {/* <Link to="/products" style={styles.card}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQtWiKm9-AT1FZ56aXb7V_EuQKRi-YqI2zKg&s" alt="products" style={styles.icon} />
          <h3>Recommended Products</h3>
        </Link> */}

        <Link to="/myorders" style={styles.card}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2WzqE_8XWDs1W6dLxfN_2HbGH6Vb5C2u1Q&s" alt="orders" style={styles.icon} />
          <h3>My Orders</h3>
        </Link>
      </div>

      
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/042/673/230/small/hexagon-security-electronic-for-safety-with-hologram-concept-for-future-technology-element-background-business-screen-vector.jpg')", // Set your image URL here
    backgroundSize: "cover", // Cover the entire container
    backgroundPosition: "center", // Center the image
    backgroundAttachment: "fixed", // Keep the background fixed during scroll
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    width: "220px",
    height: "220px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    textDecoration: "none",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  icon: {
    width: "60px",
    height: "60px",
    marginBottom: "10px",
  },
  logoutButton: {
    marginTop: "30px",
    padding: "12px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s",
  },
};

export default UserDashboard;
