const express = require('express');
const router = express.Router();
const Tomo = require('../models/tomo'); // Correct import for the model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// CREATE a new user (register)
router.post('/tomo_users', async (req, res) =>
{
    const { username, password } = req.body; // Get username and password from request body

    try
    {
        // Check if the username already exists
        const existingUser = await Tomo.findOne({ username });
        if (existingUser)
        {
            return res.status(400).json({ message: 'User already exists' }); // User already exists
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newTomo = new Tomo({
            username, // Username from the request
            password: hashedPassword, // Store the hashed password
        });

        // Save the new user to the database
        await newTomo.save();

        res.status(201).json({ message: 'User created successfully', user: newTomo });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Server error' }); // Handle server error
    }
});

// GET all users (optional, for testing)
router.get('/tomo_users', async (req, res) =>
{
    try
    {
        const tomos = await Tomo.find();
        res.json(tomos);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// Additional routes can be implemented as needed

module.exports = router;
