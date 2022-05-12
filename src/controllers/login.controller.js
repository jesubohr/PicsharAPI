const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

async function WithEmailAndPassword (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { algorithm: 'HS512', expiresIn: '5m' }
    );
    res.json({ token });
}

async function WithToken (req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: 'Token not provided' });

    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ msg: 'Token invalid' });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    req.user = decoded;
    res.json({ _id: user._id });
}

module.exports = { WithEmailAndPassword, WithToken };
