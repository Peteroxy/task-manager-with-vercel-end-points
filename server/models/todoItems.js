//import mongoose to create new schema

const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'], // Assuming the status can be one of these values
        default: 'pending', // Set a default status if not provided
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// exporting Schema
module.exports = mongoose.model('Todo', TodoItemSchema);


