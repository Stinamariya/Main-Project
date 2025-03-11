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
      <div className="row">
        <div className="col col-12">
          <div className="row g-3">
            {/* Username Field */}
            <div className="col col-12">
              <label htmlFor="username" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Role Dropdown */}
            <div className="col col-12">
              <label htmlFor="role" className="form-label">Role</label>
              <select 
                name="role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="form-control"
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Email Field */}
            <div className="col col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="col col-12">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="col col-12">
              <label htmlFor="cnfPass" className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="cnfPass" 
                value={cnfPass} 
                onChange={(e) => setCnfPass(e.target.value)} 
                placeholder="Re-enter your password"
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="col col-12 text-danger">{error}</div>}

            {/* Register Button */}
            <div className="col col-12">
              <button onClick={handleSignup} className="btn btn-success">Register</button>
            </div>

            {/* Link to Login */}
            <div className="col col-12">
              <center><a href="/login">Back to Login</a></center> 
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
