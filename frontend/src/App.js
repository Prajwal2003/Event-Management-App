import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterEventForm from "./components/RegisterEventForm";
import EditEventForm from "./components/EditEventForm";
import AddEventForm from "./components/AddEventForm";
import AttendeesList from "./components/AttendeesList";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterEventForm />} />
                <Route path="/edit" element={<EditEventForm />} />
                <Route path="/add" element={<AddEventForm />} />
                <Route path="/attendees" element={<AttendeesList />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
