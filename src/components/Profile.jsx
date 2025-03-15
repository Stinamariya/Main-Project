import React, { useState, useEffect } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3031/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Profile</h1>
      {profile && (
        <div style={styles.profileInfo}>
          <p style={styles.profileDetail}><strong>Name:</strong> {profile.name}</p>
          <p style={styles.profileDetail}><strong>Email:</strong> {profile.email}</p>
          {/* Add more profile fields as needed */}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '28px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  profileInfo: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  profileDetail: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#555',
  },
  loading: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
    color: '#007bff',
  },
  error: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
    color: '#ff4d4d',
  },
};

export default Profile;
