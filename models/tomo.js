const mongoose = require('mongoose');

const tomoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure username is unique
    },
    password: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        default: Date.now, // Auto-generate register date
    },
});

module.exports = mongoose.model('Tomo', tomoSchema);
