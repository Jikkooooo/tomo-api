const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbURI = process.env.MONGO_URL;

// Initialize Express
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();
mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// Routes
const tomodachiRoute = require('./routes/tomodachi');
app.use('/tomo-api/tomodachi', tomodachiRoute);

// Start the server
app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
});
