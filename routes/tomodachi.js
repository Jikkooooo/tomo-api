const express = require('express');
const router = express.Router();
const Item = require('../models/tomo');

// GET all items
router.get('/', async (req, res) =>
{
    try
    {
        const items = await Tomodachi.find();
        res.json(items);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific item
router.get('/:id', async (req, res) =>
{
    try
    {
        const tomo = await Tomodachi.findById(req.params.id);
        if (!tomo) return res.status(404).json({ message: 'Item not found' });
        res.json(tomo);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new item
router.post('/', async (req, res) =>
{
    const tomo = new Tomodachi({
        username: req.body.name,
        password: req.body.description,
    });

    try
    {
        const newTomo = await tomo.save();
        res.status(201).json(newtOMO);
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an item
router.put('/:id', async (req, res) =>
{
    try
    {
        const updateTomo = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTomo) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an item
router.delete('/:id', async (req, res) =>
{
    try
    {
        const deletedTomo = await Tomodachi.findByIdAndDelete(req.params.id);
        if (!deletedTomo) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
