const express = require('express');
const router = express.Router();
const Tomo = require('../models/tomo');

// CREATE a new user
router.post('/tomo_users', async (req, res) =>
{
    const { username, password } = req.body;

    if (!username || !password)
    {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const tomo = new Tomo({ username, password });

    try
    {
        const newTomo = await tomo.save();
        res.status(201).json(newTomo);
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// READ all users
router.get('/', async (req, res) =>
{
    try
    {
        const users = await Tomo.find();
        res.json(users);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// READ a specific user by ID
router.get('/:id', async (req, res) =>
{
    try
    {
        const user = await Tomo.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a user by ID
router.put('/:id', async (req, res) =>
{
    try
    {
        const { username, password } = req.body;
        const updatedUser = await Tomo.findByIdAndUpdate(
            req.params.id,
            { username, password },
            { new: true, runValidators: true } // Returns the updated user and runs validation
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) =>
{
    try
    {
        const deletedUser = await Tomo.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
