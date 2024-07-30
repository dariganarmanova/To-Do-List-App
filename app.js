const express = require('express');
const { connectToDatabase, User } = require('./mongo');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
connectToDatabase();

app.get("/login", cors(), (req, res) => {
    // Placeholder for login route
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            res.json({ userId: user._id });
        } else {
            res.json("notexist");
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json("error");
    }
});

app.get("/signup", cors(), (req, res) => {
    // Placeholder for signup route
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const data = {
        email: email,
        password: password
    };
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.json("exists");
        }
        const newUser = new User({ email: email, password: password });
        const savedUser = await newUser.save();
        res.status(201).json({ userId: savedUser._id });
    } catch (e) {
        console.error(e);
        return res.status(500).json("error");
    }
});

const router = require("./routes");
app.use(router);


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
