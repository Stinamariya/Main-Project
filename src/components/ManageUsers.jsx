import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3031/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3031/api/users/${id}`);
      alert("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Users</h2>

      {/* Button to go back to Admin Dashboard */}
      <button onClick={() => navigate("/admin-dashboard")} style={styles.button}>
        Back
      </button>

      {/* User List */}
      <ul style={styles.userList}>
        {users.map((user) => (
          <li key={user._id} style={styles.userItem}>
            <span style={styles.userInfo}>
              {user.username} ({user.email})
            </span>
            <button onClick={() => deleteUser(user._id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline Styles with Proper Alignment
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    marginBottom: "15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userList: {
    listStyleType: "none",
    padding: 0,
    width: "60%",
    margin: "0 auto",
  },
  userItem: {
    display: "flex", // Flexbox for alignment
    justifyContent: "space-between", // Space between username and delete button
    alignItems: "center", // Center align items vertically
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  userInfo: {
    flexGrow: 1, // Allows text to take available space
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ManageUsers;
