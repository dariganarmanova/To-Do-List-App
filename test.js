const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function testConnection() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas with Mongoose');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas', error);
    }
}

testConnection();
