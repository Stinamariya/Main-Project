import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuw5NKrAIpaI43hSgJGt5iXz5YGQSs0HXLGWqqZkWbRWH_TGxaIPrvHr0A51nIv6pNQB0&usqp=CAU')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "rgba(76, 175, 80, 0.8)",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Personal Skincare Assistant</h1>
        {/* <div>
          <Link
            to="/signup"
            style={{
              margin: "0 15px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            style={{
              margin: "0 15px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </div> */}
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: "50px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          margin: "20px auto",
          width: "80%",
        }}
      >
        <h2>Get Personalized Skincare Recommendations</h2>
        <p>Analyze your skin and find the best products tailored for you.</p>
      </section>

      {/* Features Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black" }}>
          <h3>Skin Analysis</h3>
          <p>Answer simple questions and predict your skin type & condition.</p>
        </div>
        <div style={{ width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black" }}>
          <h3>Product Recommendations</h3>
          <p>Get a list of skincare products suited to your skin’s needs.</p>
        </div>
        <div style={{ width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black" }}>
          <h3>Shop</h3>
          <p>Buy recommended products easily and conveniently.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "rgba(76, 175, 80, 0.8)", color: "white", padding: "15px", marginTop: "20px" }}>
        <p>&copy; 2025 Personal Skincare Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;