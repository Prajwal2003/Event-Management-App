import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./EditEventForm.css";

const EditEventForm = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [eventName, setEventName] = useState(""); // ✅ Fixed: Defined eventName & setEventName
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date: "",
        time: ""
    });
    const [message, setMessage] = useState(null);
    const location = useLocation();

    // Fetch events when the component mounts
    useEffect(() => {
        fetch("http://localhost:5001/api/events")
            .then(res => res.json())
            .then(data => setEvents(data))
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
            fetch(`http://localhost:5001/api/events/${selectedEventId}`)
                .then(res => res.json())
                .then(data => {
                    setEventData({
                        name: data.name,
                        description: data.description || "",
                        date: data.date ? data.date.split("T")[0] : "",
                        time: data.time || ""
                    });
                    setEventName(data.name); // ✅ Set eventName when event is selected
                })
                .catch(err => console.error("Error fetching event details:", err));
        } else {
            setEventData({ name: "", description: "", date: "", time: "" });
            setEventName(""); // Reset event name when no event is selected
        }
    }, [selectedEventId]);

    const handleInputChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage(null);

        fetch(`http://localhost:5001/api/events/${selectedEventId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData)
        })
            .then(res => res.json())
            .then(() => setMessage({ type: "success", text: "Event updated successfully!" }))
            .catch(() => setMessage({ type: "error", text: "Error updating event!" }));
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            fetch(`http://localhost:5001/api/events/${selectedEventId}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(() => {
                    setMessage({ type: "success", text: "Event deleted successfully!" });
                    setSelectedEventId("");
                    setEvents(events.filter(event => event._id !== selectedEventId));
                })
                .catch(() => setMessage({ type: "error", text: "Error deleting event!" }));
        }
    };

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
                    <input type="date" name="date" value={eventData.date} onChange={handleInputChange} required />

                    <label>Time:</label>
                    <input type="time" name="time" value={eventData.time} onChange={handleInputChange} required />

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
