const router = require('express').Router();
const todoItemsModel = require('../models/todoItems');

// Add Todo Item to database
router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            creationDate: req.body.creationDate
        });

        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (err) {
        res.json(err);
    }
});

// Get all items
router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems);
    } catch (err) {
        res.json(err);
    }
});

// Update item
router.put('/api/item/:id', async (req, res) => {
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Item updated');
    } catch (err) {
        res.json(err);
    }
});

// Delete item from database
router.delete('/api/item/:id', async (req, res) => {
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item deleted');
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
