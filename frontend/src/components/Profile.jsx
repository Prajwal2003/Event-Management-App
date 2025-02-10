import React from "react";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />; // Redirect to login if not logged in
    }

    let user;
    try {
        user = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get user info
    } catch (error) {
        console.error("Failed to decode token:", error);
        return <Navigate to="/login" />; // Redirect to login if token is invalid
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {/* Add more user information as needed */}
        </div>
    );
};

export default Profile;
