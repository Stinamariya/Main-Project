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
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default AdminLogin;
