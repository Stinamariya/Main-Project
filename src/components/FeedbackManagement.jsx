import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:3031/api/admin/feedback");
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "20px",
          transition: "background-color 0.3s, transform 0.2s",
        }}
      >
        Back
      </button>

      <h2 style={{ textAlign: "center", color: "#343a40", marginBottom: "30px" }}>
        Feedback Management
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease",
            }}
          >
            <h4
              style={{
                color: "#007bff",
                fontSize: "1.2em",
                marginBottom: "10px",
                textTransform: "capitalize",
              }}
            >
              {feedback.userId.username}
            </h4>
            <p style={{ fontStyle: "italic", color: "#777" }}>
              {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
            <p style={{ marginBottom: "15px", fontSize: "1em" }}>
              <strong>Rating:</strong> {feedback.rating}
            </p>
            <p style={{ marginBottom: "15px" }}>
              <strong>Comment:</strong> {feedback.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackManagement;
