import { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3031/api/feedback",
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Thank you for your feedback! 🎉");
      setRating(5);
      setComment("");

      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting feedback");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Share Your Experience 💬</h3>
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Rating:</label>
        <div style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: num <= rating ? "#FFD700" : "#ccc",
                transition: "color 0.2s ease-in-out",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <label style={styles.label}>Comments:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Write your feedback..."
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>Submit Feedback</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
    margin: "auto",
  },
  heading: {
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
  },
  starContainer: {
    marginBottom: "15px",
  },
  textarea: {
    width: "100%",
    minHeight: "60px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    resize: "none",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "background 0.3s",
  },
  success: {
    color: "green",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default FeedbackForm;
