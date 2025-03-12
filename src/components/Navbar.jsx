import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Navbar = () => {
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogout = () => {
    // Clear any authentication data (e.g., JWT token)
    localStorage.removeItem('token');  // Assuming you stored JWT token in localStorage
    sessionStorage.removeItem('token'); // If you used sessionStorage instead

    // Redirect to login page after logout
    navigate('/Signup'); // Using navigate to redirect
  };

  return (
    <nav style={navbarStyle}>
      <div>
        <Link to="/" style={linkStyle}>
          <h1>Personal Skincare Assistant</h1>
        </Link>
      </div>
      <div>
        
        <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
      </div>
    </nav>
  );
};

// Styling for the navbar
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'blue',
  padding: '10px 20px',
  color: '#fff',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginLeft: '15px',
  fontSize: '18px',
};

const logoutButtonStyle = {
  backgroundColor: '#ff6347', // Red color for logout button
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  marginLeft: '15px',
  borderRadius: '5px',
};

export default Navbar;
