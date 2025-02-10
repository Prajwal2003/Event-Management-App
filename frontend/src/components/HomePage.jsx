import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Stylesheets/HomePage.css";

const HomePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/api/events")
            .then(res => setEvents(res.data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    return (
        <div className="home-container">
            <h1>Upcoming Events</h1>
            <div className="navigation">
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
                <Link to="/profile"><button>Profile</button></Link>
            </div>

            <div className="event-list">
                {events.length > 0 ? (
                    events.map(event => (
                        <div key={event._id} className="event-card">
                            <h2>{event.name}</h2>
                            <p>{event.description || "No description available"}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {event.time}</p>

                            <div className="event-actions">
                                <Link to="/register" state={{ eventId: event._id, eventName: event.name }}>
                                    <button className="register-btn">Register</button>
                                </Link>
                                <Link to="/edit" state={{ eventId: event._id, eventName: event.name }}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>

            <div className="actions">
                <Link to="/add"><button className="add-event-btn">Add Event</button></Link>
                <Link to="/attendees"><button className="view-attendees-btn">View Attendees</button></Link>
            </div>
        </div>
    );
};

export default HomePage;
