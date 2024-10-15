const express = require('express');
const bcrypt = require('bcrypt'); // Make sure to require bcrypt
const router = express.Router();
const Tomo = require('../models/tomo');

// CREATE a new user
router.post('/users', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new Tomo({ username, password: hashedPassword });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// READ all users
router.get('/users', async (req, res) => {
    try {
        const users = await Tomo.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ a specific user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await Tomo.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined; // Hash the new password if provided
        const updatedUser = await Tomo.findByIdAndUpdate(
            req.params.id,
            { username, password: hashedPassword }, // Update password only if it's provided
            { new: true, runValidators: true } // Returns the updated user and runs validation
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await Tomo.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
