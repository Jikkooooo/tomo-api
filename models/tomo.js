const mongoose = require('mongoose');

const tomodachiSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Tomodachi', tomodachiSchema);
