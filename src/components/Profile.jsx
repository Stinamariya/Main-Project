import React from 'react';

const Profile = ({ userData }) => {
  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      {/* Add any other profile-related information here */}
    </div>
  );
};

export default Profile;
