const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const JWT_SIGN = (payload) => [
    { sub: payload._id },
    process.env.JWT_SECRET,
    { algorithm: 'HS512', expiresIn: '5m' },
];

async function WithEmailAndPassword (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(...JWT_SIGN(user));
    res.json({ token });
}

module.exports = { WithEmailAndPassword };
