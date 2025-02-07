import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RegisterEventForm.css";

const RegisterEventForm = () => {
    const location = useLocation();
    const { eventName: preselectedEvent } = location.state || {};

    const [name, setName] = useState("");
    const [eventName, setEventName] = useState(preselectedEvent || "");
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5001/api/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const res = await fetch("http://localhost:5001/api/attendees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, eventName })
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Registered successfully!" });
                setName("");
                setEventName("");
            } else {
                throw new Error("Registration failed!");
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Error: Registration failed!" });
        }
    };

    return (
        <div className="register-container">
            <h2>Register for an Event</h2>

            {message && <p className={`message ${message.type}`}>{message.text}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />

                <label>Event:</label>
                <select value={eventName} onChange={(e) => setEventName(e.target.value)} required>
                    <option value="">Select an event</option>
                    {events.map(event => (
                        <option key={event._id} value={event.name}>{event.name}</option>
                    ))}
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterEventForm;
