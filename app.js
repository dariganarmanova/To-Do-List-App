const express = require('express');
const { connectToDatabase, User } = require('./mongo');
const cors = require('cors');
const todoRoutes = require('./routes'); // Import routes

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Connect to the database
connectToDatabase();

app.use('/todo-list', todoRoutes); // Mount routes under /todo-list

// Login routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ userId: user._id });
        } else {
            return res.json("notexist");
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json("error");
    }
});

// Signup routes
app.post("/signup", async (req, res) => {
    const { email, password } = req.body; //this is the data we are received
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json("exists");
        }
        const newUser = new User({ email, password });
        const savedUser = await newUser.save();
        return res.status(201).json({ userId: savedUser._id });
    } catch (e) {
        console.error(e);
        return res.status(500).json("error");
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
