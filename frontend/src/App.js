import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterEventForm from "./components/RegisterEventForm";
import EditEventForm from "./components/EditEventForm";
import AddEventForm from "./components/AddEventForm";
import AttendeesList from "./components/AttendeesList";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/register" element={<PrivateRoute><RegisterEventForm /></PrivateRoute>} />
                <Route path="/edit" element={<PrivateRoute><EditEventForm /></PrivateRoute>} />
                <Route path="/add" element={<PrivateRoute><AddEventForm /></PrivateRoute>} />
                <Route path="/attendees" element={<PrivateRoute><AttendeesList /></PrivateRoute>} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
