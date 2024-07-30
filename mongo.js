const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI; // Ensure this is in your .env file

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas with Mongoose');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas', error);
    }
}

// Call the function to connect to the database

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);
const ToDo = mongoose.model('ToDo', todoSchema)

module.exports = { connectToDatabase, User, ToDo };
