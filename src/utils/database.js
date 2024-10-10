const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connect = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error('MongoDB URI is missing!');
        process.exit(1);
    }

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
};

module.exports = { connect };
