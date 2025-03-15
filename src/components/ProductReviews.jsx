import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductReviews = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3031/api/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.response?.data || error);
      setError("Failed to fetch reviews.");
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Reviews</h3>
      {error && <p style={styles.error}>{error}</p>}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} style={styles.review}>
            <p style={styles.reviewText}><strong>{review.username}</strong>: {review.comment} ⭐ {review.rating}</p>
          </div>
        ))
      ) : (
        <p style={styles.noReviews}>No reviews yet.</p>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  review: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  reviewText: {
    fontSize: "16px",
    lineHeight: "1.5",
  },
  noReviews: {
    fontStyle: "italic",
    color: "#666",
  },
};

export default ProductReviews;
