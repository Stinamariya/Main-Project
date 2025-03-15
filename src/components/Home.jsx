// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.container}>
//       {/* Hero Section */}
//       <div style={styles.hero}>
//         <h1 style={styles.title}>Welcome to Personal Skincare Assistant</h1>
//         <p style={styles.subtitle}>
//           Get personalized skincare recommendations based on your skin type and lifestyle.
//         </p>
//         <button style={styles.button} onClick={() => navigate("/questionnaire")}>
//           Start Skin Analysis
//         </button>
//       </div>

//       {/* Features Section */}
//       <div style={styles.features}>
//         <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
//         <div style={styles.featureList}>
//           <div style={styles.featureItem}>
//             <h3>✨ AI-Powered Skin Analysis</h3>
//             <p>Our smart AI analyzes your skin condition based on your inputs.</p>
//           </div>
//           <div style={styles.featureItem}>
//             <h3>🛍️ Personalized Product Recommendations</h3>
//             <p>Get the best skincare products tailored to your needs.</p>
//           </div>
//           <div style={styles.featureItem}>
//             <h3>📊 Track Your Skin Progress</h3>
//             <p>Monitor changes in your skin over time with our progress tracker.</p>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div style={styles.cta}>
//         <h2>Ready to Transform Your Skincare Routine?</h2>
//         <button style={styles.button} onClick={() => navigate("/questionnaire")}>
//           Take the Quiz
//         </button>
//       </div>
//     </div>
//   );
// }

// // Simple Inline Styles
// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     textAlign: "center",
//     padding: "20px",
//   },
//   hero: {
//     background: "#f5f5f5",
//     padding: "50px 20px",
//     borderRadius: "10px",
//   },
//   title: {
//     fontSize: "2.5rem",
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: "1.2rem",
//     marginBottom: "20px",
//     color: "#555",
//   },
//   button: {
//     padding: "10px 20px",
//     fontSize: "1rem",
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   features: {
//     marginTop: "50px",
//   },
//   sectionTitle: {
//     fontSize: "2rem",
//     marginBottom: "20px",
//   },
//   featureList: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     flexWrap: "wrap",
//   },
//   featureItem: {
//     background: "#e3e3e3",
//     padding: "20px",
//     borderRadius: "8px",
//     width: "300px",
//     textAlign: "left",
//   },
//   cta: {
//     marginTop: "40px",
//     padding: "30px",
//     background: "#007bff",
//     color: "white",
//     borderRadius: "10px",
//   },
// };

// export default Home;










import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#4CAF50", padding: "15px", color: "white" }}>
        <h1>Personal Skincare Assistant</h1>
        <nav>
          <Link to="/products" style={{ margin: "0 15px", color: "white", textDecoration: "none" }}>Products</Link>
          <Link to="/skin-analysis" style={{ margin: "0 15px", color: "white", textDecoration: "none" }}>Skin Analysis</Link>
          <Link to="/login" style={{ margin: "0 15px", color: "white", textDecoration: "none" }}>Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f9f9f9" }}>
        <h2>Get Personalized Skincare Recommendations</h2>
        <p>Analyze your skin and find the best products tailored for you.</p>
        <Link to="/skin-analysis">
          <button style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}>
            Start Analysis
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section style={{ display: "flex", justifyContent: "center", padding: "30px", gap: "20px" }}>
        <div style={{ width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Skin Analysis</h3>
          <p>Answer simple questions and predict your skin type & condition.</p>
        </div>
        <div style={{ width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Product Recommendations</h3>
          <p>Get a list of skincare products suited to your skin’s needs.</p>
        </div>
        <div style={{ width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Shop </h3>
          <p>Buy recommended products.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#4CAF50", color: "white", padding: "15px", marginTop: "20px" }}>
        <p>&copy; 2025 Personal Skincare Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;




