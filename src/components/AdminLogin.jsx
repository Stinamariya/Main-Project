import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // For navigation after login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    setLoading(true); // Show loading indicator

    try {
      // Send login request for an admin
      const response = await axios.post('http://localhost:3031/admin-login', { email, password });

      // Check if the response contains the token
      if (response.data && response.data.token) {
        // Store the JWT token and role in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'admin');  // Set the role to admin

        // Redirect to admin dashboard
        navigate('/admin-dashboard'); 
      } else {
        throw new Error('Invalid response from server');
      }

      // Clear the input fields
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error.response || error); // Log the full error response

      // Handle different error cases
      if (error.response && error.response.data) {
        alert(`Login failed: ${error.response.data.status}`);
      } else {
        alert('Login failed: Invalid email or password');
      }
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }
        .login-form {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        input:focus {
          border-color: #007bff;
          outline: none;
        }
        .btn-login {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
        }
        .btn-login:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
        .btn-login:hover:not(:disabled) {
          background-color: #0056b3;
        }
        @media (max-width: 600px) {
          .login-form {
            width: 90%;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;
