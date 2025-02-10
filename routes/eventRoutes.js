const express = require('express');
const Event = require('../models/event');
const { authenticateJWT } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ message: 'Access denied. Admins only.' });
    }
    console.log(req.body); // Log the incoming request body
    const { name, type, description, date_time } = req.body;
    try {
        const event = new Event({ name, type, description, date_time });
        await event.save();
        res.status(201).send({ message: 'Event created successfully', event });
    } catch (err) {
        res.status(400).send({ message: 'Error creating event', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).send(events);
    } catch (err) {
        res.status(400).send({ message: 'Error fetching events', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        res.status(200).send(event);
    } catch (err) {
        res.status(400).send({ message: 'Error fetching event', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, type, description, date_time } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(id, { name, type, description, date_time }, { new: true });
        res.status(200).send({ message: 'Event updated successfully', event });
    } catch (err) {
        res.status(400).send({ message: 'Error updating event', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(200).send({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Error deleting event', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving events', error: err });
    }
});

module.exports = router;
