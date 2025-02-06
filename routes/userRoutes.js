const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/create', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).send({ message: 'User created successfully', user });
    } catch (err) {
        res.status(400).send({ message: 'Error creating user', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send({ message: 'Error fetching users', error: err.message });
    }
});

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ message: 'Error fetching user', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { username, password, role }, { new: true });
        res.status(200).send({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(400).send({ message: 'Error updating user', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Error deleting user', error: err.message });
    }
});

module.exports = router;
