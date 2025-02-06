const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);

mongoose.connect('mongodb+srv://admin:vL6va0zYWRNOnq2r@twitter-scrapping.cpib0.mongodb.net/Event-Management-DB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const port = 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
