// import { useEffect, useState } from "react";
// import axios from "axios";

// const FeedbackList = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   const fetchFeedbacks = async () => {
//     try {
//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       const response = await axios.get("http://localhost:3031/api/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.message) {
//         setError(response.data.message);
//         setFeedbacks([]);
//       } else {
//         setFeedbacks(response.data);
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Error fetching feedback");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this feedback?")) return;

//     try {
//       await axios.delete(`http://localhost:3031/api/feedback/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
//       alert("Feedback deleted successfully.");
//     } catch (error) {
//       setError(error.response?.data?.message || "Error deleting feedback");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h3 style={styles.heading}>User Reviews 📝</h3>
//       {error && <p style={styles.error}>{error}</p>}

//       {feedbacks.length > 0 ? (
//         <ul style={styles.list}>
//           {feedbacks.map((feedback) => (
//             <li key={feedback._id} style={styles.card}>
//               <div>
//                 <strong>{feedback.userId?.username || "Anonymous"}:</strong> {feedback.comment}
//                 <div style={styles.stars}>
//                   {Array.from({ length: 5 }, (_, i) => (
//                     <span key={i} style={{ color: i < feedback.rating ? "#FFD700" : "#ccc", fontSize: "18px" }}>
//                       ★
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <button onClick={() => handleDelete(feedback._id)} style={styles.deleteButton}>
//                 🗑
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p>No feedback available yet.</p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     borderRadius: "10px",
//     backgroundColor: "#fff",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     maxWidth: "500px",
//     margin: "auto",
//   },
//   heading: {
//     textAlign: "center",
//     color: "#333",
//   },
//   error: {
//     color: "red",
//     textAlign: "center",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//   },
//   card: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "12px",
//     borderRadius: "8px",
//     backgroundColor: "#f7f7f7",
//     marginBottom: "10px",
//     alignItems: "center",
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     color: "white",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default FeedbackList;











import { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId"); // Get logged-in user ID

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:3031/api/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.message) {
        setError(response.data.message);
        setFeedbacks([]);
      } else {
        setFeedbacks(response.data);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError(error.response?.data?.message || "Error fetching feedback");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3031/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id)); // Update UI
      alert("Feedback deleted successfully.");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setError(error.response?.data?.message || "Error deleting feedback");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>What Users Say</h3>
      {error && <p style={styles.error}>{error}</p>}
      {feedbacks.length > 0 ? (
        <ul style={styles.list}>
          {feedbacks.map((feedback) => (
            <li key={feedback._id} style={styles.item}>
              <div>
                <strong>{feedback.userId?.username || "Anonymous"}:</strong> {feedback.comment}
                <div>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < feedback.rating ? "#FFD700" : "#ccc",
                        fontSize: "18px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Show delete button only if the logged-in user is the owner of the feedback */}
              {feedback.userId?._id === loggedInUserId && (
                <button onClick={() => handleDelete(feedback._id)} style={styles.deleteButton}>
                  🗑
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No feedback available yet.</p>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "red",
  },
};

export default FeedbackList;
