import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ChooseLogin = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.box}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.title}>Choose Login Type</h2>
        <motion.button
          style={styles.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          User Login
        </motion.button>
        <motion.button
          style={styles.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/admin/login")}
        >
          Admin Login
        </motion.button>
      </motion.div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
  },
  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    background: "#ff69b4",
    color: "#fff",
  },
};

export default ChooseLogin;
