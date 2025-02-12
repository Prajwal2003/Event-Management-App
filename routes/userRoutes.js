const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';

router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;
    console.log("Signup request received:", { username, password, role }); 

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: "Username already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });

        await user.save();
        console.log("User created successfully:", user); // ✅ Debug log

        res.status(201).send({ message: "User created successfully", user });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(400).send({ message: "Error creating user", error: err.message });
    }
});


// Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            console.log("❌ User not found:", username);
            return res.status(404).send({ message: 'User not found' });
        }

        console.log("✅ User found:", user);

        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            console.log("❌ Password does not match. Entered:", password, "Stored:", user.password);
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        console.log("✅ Password matched successfully!");

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token });

    } catch (err) {
        console.log("❌ Error in login process:", err);
        res.status(400).send({ message: 'Error logging in', error: err.message });
    }
});


const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

// Example of a protected route
router.get('/protected', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});

module.exports = router;

