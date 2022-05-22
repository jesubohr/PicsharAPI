const createServer = require('./server');
require('dotenv').config();
require('./database');

const PORT = process.env.PORT || 5000;

// Server
const server = createServer();
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
