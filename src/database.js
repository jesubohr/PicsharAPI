const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {}, (err) => {
    if (err) console.error(err);
    else console.log('Connected to MongoDB');
});
