import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.homeContainer}>
      {/* App Name */}
      <h1 style={styles.appName}>Personal Skincare Assistant</h1>

      {/* Main Content */}
      <motion.div
        style={styles.contentBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 style={styles.title}>Your Personalized Skincare Guide 🌿</h2>
        <p style={styles.description}>
          Discover skincare solutions tailored just for you.
        </p>
        <motion.button
          style={styles.getStartedBtn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/SignUp")}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

// 🎨 **Embedded CSS **
const styles = {
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffb6c1, #ff69b4)", // Soft pink gradient
    textAlign: "center",
    padding: "20px",
    color: "#fff",
  },
  appName: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "20px",
  },
  contentBox: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  getStartedBtn: {
    background: "#ff69b4", // Hot pink
    color: "#fff",
    fontSize: "1rem",
    padding: "12px 30px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease-in-out",
    outline: "none",
  },
};

export default Home;
