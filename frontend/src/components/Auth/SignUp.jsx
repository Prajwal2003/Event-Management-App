import React, { useState } from "react";
import axios from "axios";
import "../Stylesheets/SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // ✅ Hook for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error messages

        try {
            const response = await axios.post("http://localhost:5001/api/users/signup", { username, password, role });
            alert(response.data.message);
            navigate("/login");
        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-page">
            <div className="sign-up-header">SIGNUP</div>
            <form className="signup-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>} {/* Show error message */}

                <div className="signup-name">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="signup-password">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="signup-role">
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
