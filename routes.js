const express = require("express");
const router = express.Router();
const { ToDo } = require('./mongo');

// Get all to-dos for a user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const todos = await ToDo.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving to-do items", error });
    }
});

// Create a new to-do item
router.post("/", async (req, res) => {
    const { userId, title } = req.body;
    const newToDo = new ToDo({
        userId,
        title
    });
    try {
        const saveToDo = await newToDo.save();
        res.status(201).json(saveToDo);
    } catch (error) {
        res.status(500).json({ message: "Error saving to-do item", error });
    }
});

// Delete a to-do item
router.delete("/:id", async (req, res) => {
    try {
        const deletedItem = await ToDo.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ message: "Could not delete the item", error });
    }
});

// Update a to-do item
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body; // Assuming you're updating title and completed status
        const todo = await ToDo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true } // Return the updated document
        );
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'To-do not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
