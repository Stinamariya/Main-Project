// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaTrash } from "react-icons/fa";

// const StarRating = ({ rating, onChange }) => {
//   const [hover, setHover] = useState(null);

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <FaStar
//           key={star}
//           size={25}
//           onClick={() => onChange(star)}
//           onMouseEnter={() => setHover(star)}
//           onMouseLeave={() => setHover(null)}
//           color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
//           style={{ cursor: "pointer", marginRight: "5px" }}
//         />
//       ))}
//     </div>
//   );
// };

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [review, setReview] = useState({ rating: 0, comment: "" });
//   const user = localStorage.getItem("username") || "Guest"; // Get the current user

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:3031/api/products/${id}`);
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const submitReview = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:3031/api/products/${id}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user, rating: review.rating, comment: review.comment }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setProduct(data.product);
//         setReview({ rating: 0, comment: "" });
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error("Error submitting review:", err);
//     }
//   };

//   const deleteReview = async (reviewId) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) return;

//     try {
//       const res = await fetch(`http://localhost:3031/api/products/${id}/reviews/${reviewId}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setProduct(data.product);
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error("Error deleting review:", err);
//     }
//   };

//   if (error) return <p>Error: {error}</p>;
//   if (!product) return <p>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>

//       <h2>{product.productName}</h2>
//       <p><strong>Concern:</strong> {product.concern}</p>
//       <p><strong>Skin Type:</strong> {product.skinType}</p>
//       <img src={product.productPic} alt={product.productName} style={styles.productImage} />

//       <h3>Reviews</h3>
//       {product.reviews.length > 0 ? (
//         product.reviews.map((r, index) => (
//           <div key={index} style={styles.reviewContainer}>
//             <div style={styles.reviewText}>
//               <strong>{r.user}</strong> -{" "}
//               {Array.from({ length: r.rating }, (_, i) => <FaStar key={i} color="#ffc107" />)}
//               <p>{r.comment}</p>
//             </div>
//             {r.user === user && (
//               <FaTrash onClick={() => deleteReview(r._id)} style={styles.deleteIcon} />
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No reviews yet</p>
//       )}

//       <h3>Write a Review</h3>
//       <form onSubmit={submitReview} style={styles.form}>
//         <label>Rating:</label>
//         <StarRating rating={review.rating} onChange={(value) => setReview({ ...review, rating: value })} />

//         <label>Comment:</label>
//         <textarea
//           value={review.comment}
//           onChange={(e) => setReview({ ...review, comment: e.target.value })}
//           style={styles.textarea}
//         />

//         <button type="submit" style={styles.submitButton}>Submit Review</button>
//       </form>
//     </div>
//   );
// };

// // Inline Styles
// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     color: "#333",
//   },
//   backButton: {
//     marginBottom: "15px",
//     padding: "10px",
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//   },
//   productImage: {
//     width: "150px",
//     marginBottom: "15px",
//   },
//   reviewContainer: {
//     borderBottom: "1px solid #ccc",
//     marginBottom: "10px",
//     display: "flex",
//     alignItems: "center",
//   },
//   reviewText: {
//     flex: 1,
//   },
//   deleteIcon: {
//     cursor: "pointer",
//     color: "red",
//     marginLeft: "10px",
//   },
//   form: {
//     marginTop: "20px",
//   },
//   textarea: {
//     width: "100%",
//     height: "100px",
//     padding: "10px",
//     marginTop: "10px",
//     marginBottom: "15px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//   },
//   submitButton: {
//     padding: "10px 15px",
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default ProductDetails;








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaTrash } from "react-icons/fa";

// // Star Rating Component
// const StarRating = ({ rating, onChange }) => {
//   const [hover, setHover] = useState(null);

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <FaStar
//           key={star}
//           size={25}
//           onClick={() => onChange(star)}
//           onMouseEnter={() => setHover(star)}
//           onMouseLeave={() => setHover(null)}
//           color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
//           style={{ cursor: "pointer", marginRight: "5px" }}
//         />
//       ))}
//     </div>
//   );
// };

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [review, setReview] = useState({ rating: 0, comment: "" });
//   const user = localStorage.getItem("username"); // Get logged-in user from localStorage

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:3031/api/products/${id}`);
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // ✅ Submit a Review
//   const submitReview = async (e) => {
//     e.preventDefault();
    
//     console.log("Submitting review...");
  
//     try {
//       const res = await fetch("http://localhost:3031/api/reviews/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productId: id,
//           rating: review.rating,
//           comment: review.comment,
//         }),
//         credentials: "include",
//       });
  
//       console.log("Response status:", res.status);
//       const data = await res.json();
//       console.log("Response data:", data);
  
//       if (res.ok) {
//         setProduct(data.product);
//         setReview({ rating: 0, comment: "" });
//       } else {
//         alert(data.error || "Failed to submit review.");
//       }
//     } catch (err) {
//       console.error("Error submitting review:", err);
//       alert("Error submitting review. Check console for details.");
//     }
//   };
  
  
  

//   // ❌ Delete a Review
//   const deleteReview = async (reviewId) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) return;

//     try {
//       const res = await fetch(`http://localhost:3031/api/products/${id}/reviews/${reviewId}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setProduct(data.product);
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error("Error deleting review:", err);
//     }
//   };

//   if (error) return <p>Error: {error}</p>;
//   if (!product) return <p>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>

//       <h2>{product.productName}</h2>
//       <p><strong>Concern:</strong> {product.concern}</p>
//       <p><strong>Skin Type:</strong> {product.skinType}</p>
//       <img src={product.productPic} alt={product.productName} style={styles.productImage} />

//       {/* 🔥 Reviews Section */}
//       <h3>Reviews</h3>
//       {product.reviews.length > 0 ? (
//         product.reviews.map((r, index) => (
//           <div key={index} style={styles.reviewContainer}>
//             <div style={styles.reviewText}>
//               <strong>{r.user}</strong> -{" "}
//               {Array.from({ length: r.rating }, (_, i) => <FaStar key={i} color="#ffc107" />)}
//               <p>{r.comment}</p>
//             </div>
//             {r.user === user && (
//               <FaTrash onClick={() => deleteReview(r._id)} style={styles.deleteIcon} />
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No reviews yet</p>
//       )}

//       {/* ✍️ Write a Review */}
//       <h3>Write a Review</h3>
//       <form onSubmit={submitReview} style={styles.form}>
//         <label>Rating:</label>
//         <StarRating rating={review.rating} onChange={(value) => setReview({ ...review, rating: value })} />

//         <label>Comment:</label>
//         <textarea
//           value={review.comment}
//           onChange={(e) => setReview({ ...review, comment: e.target.value })}
//           style={styles.textarea}
//         />

//         <button type="submit" style={styles.submitButton}>Submit Review</button>
//       </form>
//     </div>
//   );
// };

// // 🔥 Inline Styles
// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     color: "#333",
//   },
//   backButton: {
//     marginBottom: "10px",
//     padding: "10px",
//     backgroundColor: "#ddd",
//     border: "none",
//     cursor: "pointer",
//   },
//   productImage: {
//     width: "200px",
//     height: "200px",
//     objectFit: "cover",
//   },
//   reviewContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px",
//     backgroundColor: "#f9f9f9",
//     marginBottom: "10px",
//     borderRadius: "5px",
//   },
//   deleteIcon: {
//     cursor: "pointer",
//     color: "red",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   },
//   textarea: {
//     width: "100%",
//     height: "80px",
//     padding: "5px",
//   },
//   submitButton: {
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default ProductDetails;







// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaStar, FaTrash, FaArrowLeft } from "react-icons/fa";

// // Star Rating Component
// const StarRating = ({ rating, onChange }) => {
//   const [hover, setHover] = useState(null);

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <FaStar
//           key={star}
//           size={25}
//           onClick={() => onChange(star)}
//           onMouseEnter={() => setHover(star)}
//           onMouseLeave={() => setHover(null)}
//           color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
//           style={{ cursor: "pointer", marginRight: "5px" }}
//         />
//       ))}
//     </div>
//   );
// };

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [review, setReview] = useState({ rating: 0, comment: "" });
//   const [reviews, setReviews] = useState([]);
//   const userId = localStorage.getItem("userId");
//   const username = localStorage.getItem("username");

//   // Fetch Product Details and Reviews
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:3031/api/products/${id}`);
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         const data = await res.json();

//         setProduct(data);
//         setReviews(data.reviews || []);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // Submit Review
//   const submitReview = async (e) => {
//     e.preventDefault();

//     if (!userId || !username) {
//       alert("User not logged in!");
//       return;
//     }

//     const reviewData = {
//       userId,
//       username,
//       productId: id,
//       rating: review.rating,
//       comment: review.comment,
//     };

//     try {
//       const response = await fetch("http://localhost:3031/api/reviews/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(reviewData),
//       });

//       if (!response.ok) throw new Error("Failed to submit review");

//       const data = await response.json();

//       setReviews([...reviews, { ...reviewData, _id: data.reviewId }]);
//       setReview({ rating: 0, comment: "" });
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   // Delete Review
//   const deleteReview = async (reviewId) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Authentication required. Please log in again.");
//         return;
//       }

//       const response = await fetch(`http://localhost:3031/api/reviews/delete/${reviewId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete review");
//       }

//       setReviews(reviews.filter((rev) => rev._id !== reviewId));
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
//   if (!product) return <p style={{ textAlign: "center" }}>Loading...</p>;

//   return (
//     <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         style={{
//           padding: "8px 15px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontSize: "14px",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//           marginBottom: "10px",
//         }}
//       >
//         <FaArrowLeft /> Back
//       </button>

//       <h2 style={{ textAlign: "center", color: "#333" }}>{product.name}</h2>
//       <p style={{ fontSize: "16px", marginBottom: "10px" }}>{product.description}</p>

//       {/* Review Form */}
//       <h3 style={{ marginBottom: "10px" }}>Leave a Review</h3>
//       <form onSubmit={submitReview} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <StarRating rating={review.rating} onChange={(rating) => setReview({ ...review, rating })} />
//         <textarea
//           value={review.comment}
//           onChange={(e) => setReview({ ...review, comment: e.target.value })}
//           placeholder="Write your review..."
//           required
//           style={{
//             padding: "10px",
//             fontSize: "14px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             resize: "none",
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "10px",
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//           }}
//         >
//           Submit Review
//         </button>
//       </form>

//       {/* Review List */}
//       <h3 style={{ marginTop: "20px" }}>Reviews</h3>
//       {reviews.length === 0 ? (
//         <p>No reviews yet.</p>
//       ) : (
//         <ul style={{ listStyleType: "none", padding: "0" }}>
//           {reviews.map((rev) => (
//             <li
//               key={rev._id}
//               style={{
//                 marginBottom: "10px",
//                 padding: "10px",
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <div>
//                 <p><strong>User:</strong> {rev.username || "Anonymous"}</p>
//                 <p><strong>Rating:</strong> {rev.rating ? `${rev.rating} ⭐` : "No rating"}</p>
//                 <p><strong>Comment:</strong> {rev.comment || "No comment provided."}</p>
//               </div>
//               {userId === rev.userId && (
//                 <button
//                   onClick={() => deleteReview(rev._id)}
//                   style={{
//                     padding: "8px",
//                     backgroundColor: "#dc3545",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "5px",
//                     transition: "background-color 0.3s",
//                   }}
//                 >
//                   <FaTrash size={16} />
//                   Delete
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;











import React, { useState, useEffect } from "react";

const ProductDetails = ({ productId, userId, username }) => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    // Fetch Product Details
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3031/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Fetch Reviews
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3031/api/reviews/${productId}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  // Submit Review
  const submitReview = async (e) => {
    e.preventDefault();
  
    if (!userId || !username) {
      alert("Please log in to leave a review!");
      return;
    }
  
    if (!productId) {
      alert("Invalid product. Cannot submit review.");
      return;
    }
  
    const reviewData = { userId, username, productId, rating: review.rating, comment: review.comment };
  
    try {
      const response = await fetch("http://localhost:3031/api/reviews/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
  
      if (!response.ok) throw new Error("Failed to submit review");
  
      const newReview = await response.json(); // Get the review from the response
      setReviews([...reviews, newReview]); // Update state with the new review
      setReview({ rating: 0, comment: "" }); // Reset form
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} width="200" />
          <p>{product.description}</p>

          <h3>Reviews</h3>
          <ul>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <li key={rev._id}>
                  <strong>{rev.username}</strong>: {rev.comment} ({rev.rating}/5)
                </li>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ul>

          <h3>Leave a Review</h3>
          <form onSubmit={submitReview}>
            <label>Rating (1-5):</label>
            <input
              type="number"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              min="1"
              max="5"
              required
            />
            <label>Comment:</label>
            <textarea
              value={review.comment}
              onChange={(e) => setReview({ ...review, comment: e.target.value })}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;








