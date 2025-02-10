import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const AttendeesList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/api/events")
            .then(res => setEvents(res.data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    useEffect(() => {
        if (selectedEvent) {
            axios.get(`http://localhost:5001/api/attendees?eventName=${selectedEvent}`)
                .then(res => setAttendees(res.data))
                .catch(err => console.error("Error fetching attendees:", err));
        } else {
            setAttendees([]);
        }
    }, [selectedEvent]);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Attendee List</h2>

            <div style={styles.selectContainer}>
                <label style={styles.label}>Select Event:</label>
                <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    style={styles.selectBox}
                >
                    <option value="">-- Select an Event --</option>
                    {events.map(event => (
                        <option key={event._id} value={event.name}>
                            {event.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedEvent && (
                <div style={styles.tableContainer}>
                    {attendees.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Registration Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendees.map(attendee => (
                                    <tr key={attendee._id}>
                                        <td style={styles.td}>{attendee.name}</td>
                                        <td style={styles.td}>
                                            {new Date(attendee.registrationTime).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={styles.noDataText}>No attendees registered for this event.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "600px",
        margin: "30px auto",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#343a40",
    },
    selectContainer: {
        marginBottom: "20px",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
        marginRight: "10px",
    },
    selectBox: {
        padding: "8px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ced4da",
        backgroundColor: "#ffffff",
    },
    tableContainer: {
        marginTop: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#ffffff",
    },
    th: {
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "10px",
        border: "1px solid #dee2e6",
    },
    td: {
        padding: "10px",
        border: "1px solid #dee2e6",
    },
    noDataText: {
        fontSize: "16px",
        color: "#6c757d",
        marginTop: "10px",
    },
};

export default AttendeesList;
