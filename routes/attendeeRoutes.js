const express = require('express');
const Attendee = require('../models/attendee');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, event, user } = req.body;
    try {
        const attendee = new Attendee({ name, event, user });
        await attendee.save();
        res.status(201).send({ message: 'Attendee registered successfully', attendee });
    } catch (err) {
        res.status(400).send({ message: 'Error registering attendee', error: err.message });
    }
});

router.get('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        const attendees = await Attendee.find({ event: eventId }).populate('event user');
        res.status(200).send(attendees);
    } catch (err) {
        res.status(400).send({ message: 'Error fetching attendees', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Attendee.findByIdAndDelete(id);
        res.status(200).send({ message: 'Attendee deleted successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Error deleting attendee', error: err.message });
    }
});

module.exports = router;
