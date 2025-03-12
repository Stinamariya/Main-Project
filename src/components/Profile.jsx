import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests

const UserProfile = () => {
  // States to manage the user's data and edit mode
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    skinType: '',
    skinCondition: '',
    profilePicture: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    email: '',
    skinType: '',
    skinCondition: '',
    profilePicture: '',
  });

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Replace with your API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedData({ ...updatedData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes in the form (for updating profile)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit updated profile information
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/profile', updatedData); // Replace with your API endpoint
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  return (
    <div style={profileContainerStyle}>
      <h2>My Profile</h2>

      {/* Profile Picture */}
      <div style={profilePictureContainerStyle}>
        <img
          src={updatedData.profilePicture || userData.profilePicture}
          alt="Profile"
          style={profilePictureStyle}
        />
        <input
          type="file"
          onChange={handleProfilePictureChange}
          style={fileInputStyle}
        />
        <p>Click to upload a new profile picture</p>
      </div>

      {/* User Information */}
      <div style={userInfoStyle}>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {isEditing ? <input type="text" name="name" value={updatedData.name || userData.name} onChange={handleInputChange} /> : userData.name}</p>
        <p><strong>Email:</strong> {isEditing ? <input type="email" name="email" value={updatedData.email || userData.email} onChange={handleInputChange} /> : userData.email}</p>
        <p><strong>Skin Type:</strong> {isEditing ? <input type="text" name="skinType" value={updatedData.skinType || userData.skinType} onChange={handleInputChange} /> : userData.skinType}</p>
        <p><strong>Skin Condition:</strong> {isEditing ? <input type="text" name="skinCondition" value={updatedData.skinCondition || userData.skinCondition} onChange={handleInputChange} /> : userData.skinCondition}</p>
      </div>

      {/* Edit Profile Button */}
      <div>
        {isEditing ? (
          <button style={saveButtonStyle} onClick={handleSubmit}>
            Save Changes
          </button>
        ) : (
          <button style={editButtonStyle} onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

// Styling (same as before)
const profileContainerStyle = {
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  maxWidth: '600px',
  margin: '0 auto',
};

const profilePictureContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '20px',
};

const profilePictureStyle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
};

const fileInputStyle = {
  marginTop: '10px',
};

const userInfoStyle = {
  marginBottom: '20px',
};

const editButtonStyle = {
  backgroundColor: '#ff6347',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
};

const saveButtonStyle = {
  backgroundColor: '#28a745', // Green color
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
};

export default UserProfile;
