import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPass, setCnfPass] = useState("");
  const [role, setRole] = useState("user"); // Default role set to 'user'
  const [error, setError] = useState(""); // For storing error messages
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    // Check if password and confirm password match
    if (password !== cnfPass) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Send a POST request to the backend to register the user
      const response = await axios.post("http://localhost:3031/Signup", { username, email, password, role });

      // Assuming the backend response contains the user's role
      if (response.data.role === "admin") {
        alert("Admin signup successful!");
        // Redirect to admin login page
        navigate("/admin-login");
      } else {
        alert("User signup successful!");
        // Redirect to user login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.response?.data.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <center><h1><b>SIGN UP</b></h1></center>
      <div className="form-container">
        <div className="form-group">
          {/* Username Field */}
          <label htmlFor="username">Name</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select 
            name="role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="cnfPass">Confirm Password</label>
          <input 
            type="password" 
            id="cnfPass" 
            value={cnfPass} 
            onChange={(e) => setCnfPass(e.target.value)} 
            placeholder="Re-enter your password"
            required
          />
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Register Button */}
        <div className="form-group">
          <button onClick={handleSignup} className="btn btn-success">Register</button>
        </div>

        {/* Link to Login */}
        <div className="form-group">
          <center><a href="/login">Back to Login</a></center> 
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 2rem;
          max-width: 500px;
          margin: 0 auto;
          background-color: #f7f7f7;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          margin-bottom: 1.5rem;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        input, select {
          padding: 0.75rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        input:focus, select:focus {
          border-color: #007bff;
          outline: none;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #218838;
        }
        .error-message {
          color: red;
          font-size: 0.9rem;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Signup;
