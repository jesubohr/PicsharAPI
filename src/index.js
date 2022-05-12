const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
require('./database');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/', require('./routes/auth'));
//app.use('/user', require('./routes/users'));

// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
