const jwt = require('jsonwebtoken');

function verifyToken (authHeader) {
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        return decoded;
    } catch (error) { return error; }
}

async function authWithToken (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token is required' });
    
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token not provided' });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });
    if (decoded instanceof Error) return res.status(401).json({ error: 'Invalid token' });
    
    req.user = decoded.sub
    next();
}

module.exports = { verifyToken, authWithToken };
