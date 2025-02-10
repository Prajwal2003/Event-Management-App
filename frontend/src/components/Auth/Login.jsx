import React, { useState } from "react";
import axios from "axios";
import "../Stylesheets/Login.css";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', { username, password });
            alert(response.data.message);
            localStorage.setItem('token', response.data.token); // Store the token in local storage
        } catch (error) {
            console.error('Error logging in:', error.response.data);
        }
    };

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
        return <Navigate to="/" />; // Redirect to home if already logged in
    }

    return (
        <div className="login-page">
            <div className="login-header">LOGIN</div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-username">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="login-password">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;