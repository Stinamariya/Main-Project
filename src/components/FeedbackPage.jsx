import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

const FeedbackPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleFeedbackSubmitted = () => {
    setRefresh((prev) => !prev); // Toggle state to trigger refresh
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Feedback</h2>
      <div style={styles.section}>
        <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
      </div>
      <div style={styles.section}>
        <FeedbackList refreshTrigger={refresh} />
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
  section: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
};

export default FeedbackPage;
