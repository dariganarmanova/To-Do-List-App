const express = require("express");
const router = express.Router();

router.get("/todo-list", (req, res) => {
    res.status(200).json({ message: "get request to /todo-list" })
})

router.post("/todo-list", (req, res) => {
    res.status(201).json({ message: "POST request to /todo-list" })
})

router.delete("/todo-list/:id", (req, res) => {
    res.status(200).json({ message: "delete request to /todo-list" })
})

router.put("/todo-list/:id", (req, res) => {
    res.status(200).json({ message: "put request to /todo-list" })
})

module.exports = router; 