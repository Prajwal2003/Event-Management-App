import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Stylesheets/EditEventForm.css";
import { Navigate } from "react-router-dom";

const EditEventForm = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [eventName, setEventName] = useState(""); // ✅ Fixed: Defined eventName & setEventName
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date_time: ""
    });
    const [message, setMessage] = useState(null);
    const location = useLocation();

    // Fetch events when the component mounts
    useEffect(() => {
        axios.get("http://localhost:5001/api/events")
            .then(res => setEvents(res.data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    // Preselect event if navigated from HomePage (edit button)
    useEffect(() => {
        if (location.state?.eventId) {
            setSelectedEventId(location.state.eventId);
        }
    }, [location.state]);

    // Fetch selected event details
    useEffect(() => {
        if (selectedEventId) {
            axios.get(`http://localhost:5001/api/events/${selectedEventId}`)
                .then(res => {
                    setEventData({
                        name: res.data.name,
                        description: res.data.description || "",
                        date_time: res.data.date_time || ""
                    });
                    setEventName(res.data.name); // ✅ Set eventName when event is selected
                })
                .catch(err => console.error("Error fetching event details:", err));
        } else {
            setEventData({ name: "", description: "", date_time: "" });
            setEventName(""); // Reset event name when no event is selected
        }
    }, [selectedEventId]);

    const handleInputChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage(null);

        axios.put(`http://localhost:5001/api/events/${selectedEventId}`, eventData)
            .then(() => setMessage({ type: "success", text: "Event updated successfully!" }))
            .catch(() => setMessage({ type: "error", text: "Error updating event!" }));
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            axios.delete(`http://localhost:5001/api/events/${selectedEventId}`)
                .then(() => {
                    setMessage({ type: "success", text: "Event deleted successfully!" });
                    setSelectedEventId("");
                    setEvents(events.filter(event => event._id !== selectedEventId));
                })
                .catch(() => setMessage({ type: "error", text: "Error deleting event!" }));
        }
    };

    // Check if user is logged in and is an admin
    const token = localStorage.getItem('token');
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null; // Decode JWT to get role
    if (!token || userRole !== 'admin') {
        return <Navigate to="/" />; // Redirect to home if not logged in or not an admin
    }

    return (
        <div className="edit-event-container">
            <h2>Edit Event</h2>

            {message && <p className={`message ${message.type}`}>{message.text}</p>}

            <label>Select Event:</label>
            <select
                value={selectedEventId} // ✅ Fix: Use selectedEventId instead of eventName
                onChange={(e) => setSelectedEventId(e.target.value)} // ✅ Updates selectedEventId
                required
            >
                <option value="">-- Select an Event --</option>
                {events.map(event => (
                    <option key={event._id} value={event._id}>{event.name}</option>
                ))}
            </select>

            {selectedEventId && (
                <form onSubmit={handleUpdate} className="edit-event-form">
                    <label>Event Name:</label>
                    <input type="text" name="name" value={eventData.name} onChange={handleInputChange} required />

                    <label>Description:</label>
                    <textarea name="description" value={eventData.description} onChange={handleInputChange} />

                    <label>Date:</label>
                    <input type="datetime-local" name="date_time" value={eventData.date_time} onChange={handleInputChange} required />

                    <div className="button-group">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={handleDelete} className="delete-btn">
                            Delete Event
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditEventForm;
