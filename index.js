require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));


// Import Routes
const tomodachiRoute = require('./routes/tomodachi');
app.use('/api/tomodachi', tomodachiRoute);

// Start the server
app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
});
