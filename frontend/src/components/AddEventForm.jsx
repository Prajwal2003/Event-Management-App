import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AddEventForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        date_time: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/api/events", formData);
            alert("Event added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Failed to add event:", error.response.data);
        }
    };

    // Check if user is logged in and is an admin
    const token = localStorage.getItem('token');
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null; // Decode JWT to get role
    if (!token || userRole !== 'admin') {
        return <Navigate to="/" />; // Redirect to home if not logged in or not an admin
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Type:</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />

            <label>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} />

            <label>Date:</label>
            <input type="datetime-local" name="date_time" value={formData.date_time} onChange={handleChange} required />

            <button type="submit">Add Event</button>
        </form>
    );
};

export default AddEventForm;
