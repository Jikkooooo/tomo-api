const express = require('express');
const router = express.Router();
const Tomo = require('../models/tomo');

// GET all tomos
router.get('/', async (req, res) =>
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

// GET a specific tomo by ID
router.get('/:id', async (req, res) =>
{
    try
    {
        const tomo = await Tomo.findById(req.params.id);
        if (!tomo) return res.status(404).json({ message: 'Tomo not found' });
        res.json(tomo);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new tomo
router.post('/', async (req, res) =>
{
    const tomo = new Tomo({
        name: req.body.name,
        password: req.body.description
    });

    try
    {
        const newTomo = await tomo.save();
        res.status(201).json(newTomo);
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an existing tomo
router.put('/:id', async (req, res) =>
{
    try
    {
        const updatedTomo = await Tomo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTomo) return res.status(404).json({ message: 'Tomo not found' });
        res.json(updatedTomo);
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a tomo
router.delete('/:id', async (req, res) =>
{
    try
    {
        const deletedTomo = await Tomo.findByIdAndDelete(req.params.id);
        if (!deletedTomo) return res.status(404).json({ message: 'Tomo not found' });
        res.json({ message: 'Tomo deleted' });
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
