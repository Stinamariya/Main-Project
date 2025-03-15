import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";

const StarRating = ({ rating, onChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={25}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
          style={{ cursor: "pointer", marginRight: "5px" }}
        />
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const user = localStorage.getItem("username") || "Guest"; // Get the current user

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3031/api/products/${id}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3031/api/products/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, rating: review.rating, comment: review.comment }),
      });

      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
        setReview({ rating: 0, comment: "" });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`http://localhost:3031/api/products/${id}/reviews/${reviewId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate(-1)}
        style={styles.backButton}
      >
        ← Back
      </button>

      <h2>{product.productName}</h2>
      <p><strong>Concern:</strong> {product.concern}</p>
      <p><strong>Skin Type:</strong> {product.skinType}</p>
      <img src={product.productPic} alt={product.productName} style={styles.productImage} />

      <h3>Reviews</h3>
      {product.reviews.length > 0 ? (
        product.reviews.map((r, index) => (
          <div key={index} style={styles.reviewContainer}>
            <div style={styles.reviewText}>
              <strong>{r.user}</strong> - {" "}
              {Array.from({ length: r.rating }, (_, i) => <FaStar key={i} color="#ffc107" />)}
              <p>{r.comment}</p>
            </div>
            {r.user === user && (
              <FaTrash
                onClick={() => deleteReview(r._id)}
                style={styles.deleteIcon}
              />
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}

      <h3>Write a Review</h3>
      <form onSubmit={submitReview} style={styles.form}>
        <label>Rating:</label>
        <StarRating rating={review.rating} onChange={(value) => setReview({ ...review, rating: value })} />

        <label>Comment:</label>
        <textarea
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          style={styles.textarea}
        />

        <button type="submit" style={styles.submitButton}>Submit Review</button>
      </form>
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
  backButton: {
    marginBottom: "15px",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  productImage: {
    width: "150px",
    marginBottom: "15px",
  },
  reviewContainer: {
    borderBottom: "1px solid #ccc",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
  reviewText: {
    flex: 1,
  },
  deleteIcon: {
    cursor: "pointer",
    color: "red",
    marginLeft: "10px",
  },
  form: {
    marginTop: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "10px 15px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductDetails;
