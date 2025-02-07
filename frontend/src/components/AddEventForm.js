import React, { useState } from "react";

const AddEventForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        time: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            alert("Event added successfully!");
            console.log(data);
        } catch (error) {
            console.error("Failed to add event:", error);
        }
    };

    return (
        <div>
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} />

                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                <label>Time:</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />

                <button type="submit">Add Event</button>
            </form>
        </div>
    );
};

export default AddEventForm;
