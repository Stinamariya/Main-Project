// import { useState, useEffect } from "react";
// import axios from "axios";

// const ReviewForm = ({ productId, user }) => {
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     axios.get(`/api/reviews/${productId}`).then((res) => setReviews(res.data));
//   }, [productId]);

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert("You must be logged in to leave a review!");
//       return;
//     }
//     try {
//       await axios.post(`/api/reviews/${productId}`, { rating, comment }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       alert("Review submitted!");
//       setComment("");
//       setRating(5);
//       axios.get(`/api/reviews/${productId}`).then((res) => setReviews(res.data)); // Refresh reviews
//     } catch (error) {
//       alert(error.response?.data?.message || "Error submitting review");
//     }
//   };

//   // Inline styles
//   const containerStyle = {
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     backgroundColor: "#f9f9f9",
//     width: "100%",
//     maxWidth: "600px",
//     margin: "0 auto",
//   };

//   const reviewStyle = {
//     marginBottom: "15px",
//     padding: "10px",
//     backgroundColor: "#fff",
//     border: "1px solid #eee",
//     borderRadius: "8px",
//   };

//   const formStyle = {
//     marginTop: "20px",
//     padding: "10px",
//     backgroundColor: "#fff",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//   };

//   const selectStyle = {
//     padding: "5px",
//     marginRight: "10px",
//     borderRadius: "4px",
//   };

//   const textareaStyle = {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "4px",
//     border: "1px solid #ddd",
//     marginTop: "10px",
//     marginBottom: "10px",
//     resize: "vertical",
//   };

//   const buttonStyle = {
//     padding: "10px 20px",
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   };

//   return (
//     <div style={containerStyle}>
//       <h3>Reviews</h3>
//       {reviews.map((review) => (
//         <div key={review._id} style={reviewStyle}>
//           <p><strong>{review.userId?.username || "Anonymous"}</strong> ({review.rating} ⭐)</p>
//           <p>{review.comment}</p>
//         </div>
//       ))}

//       {user && (
//         <form onSubmit={submitReview} style={formStyle}>
//           <h4>Leave a Review</h4>
//           <select value={rating} onChange={(e) => setRating(e.target.value)} style={selectStyle}>
//             {[...Array(5)].map((_, i) => (
//               <option key={i + 1} value={i + 1}>{i + 1} ⭐</option>
//             ))}
//           </select>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Write a review..."
//             required
//             style={textareaStyle}
//           />
//           <button type="submit" style={buttonStyle}>Submit Review</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ReviewForm;












import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Review() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3031/api/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No reviews found for this product") {
          setReviews([]); // No reviews available
        } else {
          setReviews(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load reviews. Try again later.");
        setLoading(false);
      });
  }, [productId]);
  

  return (
    <div style={styles.container}>
      <h1>Product Reviews</h1>
      
      {loading && <p>Loading reviews...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {reviews.length > 0 ? (
        <ul style={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review._id} style={styles.reviewItem}>
              <strong>{review.username}</strong> <span style={styles.rating}>⭐ {review.rating}</span>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet for this product.</p>
      )}

      <button onClick={() => navigate(-1)} style={styles.backButton}>Go Back</button>
    </div>
  );
}

// 🔥 Styles
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  reviewList: { listStyleType: "none", padding: 0 },
  reviewItem: { 
    marginBottom: "10px", 
    border: "1px solid #ddd", 
    padding: "10px", 
    borderRadius: "5px", 
    backgroundColor: "#f9f9f9" 
  },
  rating: { color: "orange", marginLeft: "10px" },
  error: { color: "red" },
  backButton: { 
    marginTop: "20px", 
    padding: "10px 20px", 
    backgroundColor: "blue", 
    color: "white", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
  },
};

export default Review;

