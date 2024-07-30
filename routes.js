const express = require("express");
const router = express.Router();
const { ToDo } = require('./mongo');

router.get("/todo-list/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const todos = await ToDo.find({ userId })
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: "error retrieving the to-do item" }, error)
    }
})

router.post("/todo-list", async (req, res) => {
    const { userId, title } = req.body;
    const newToDo = new ToDo({
        userId,
        title
    });
    try {
        const saveToDo = await newToDo.save();
        res.status(200).json(saveToDo)
    } catch (error) {
        res.status(500).json({ message: "error saving the to-do item", error })
    }
})

router.delete("/todo-list/:id", async (req, res) => {
    try {
        const deletedItem = await ToDo.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "item not found" })
        }
        res.status(200).json(deletedItem)
    } catch (error) {
        res.status(500).json({ message: "could not delete the item", error })
    }
})

router.put("/todo-list/:id", async (req, res) => {
    const { title, completed } = req.body;
    try {
        const updateToDo = await ToDo.findByIdAndUpdate(req.params.id, { title, completed }, { new: true })
        if (!updateToDo) {
            return res.status(404).json({ message: "could not find the item", error })
        }
        res.status(500).json(updateToDo)
    } catch (error) {
        res.status(501).json({ message: "failed to update the item" })
    }
})

module.exports = router; 