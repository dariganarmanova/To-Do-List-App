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
connectToDatabase();

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model('collection', newSchema);

module.exports = { connectToDatabase, collection };
