const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const JWT_SIGN = (payload) => [
    { sub: payload._id },
    process.env.JWT_SECRET,
    { algorithm: 'HS512', expiresIn: '5m' },
];

async function LoginToken (req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });

        return res.status(200).json({});
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function LoginUser (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = jwt.sign(...JWT_SIGN(user));
    res.json({ token });
}

async function RegisterUser (req, res) {
    const { username, birthdate, email, password, bio } = req.body;

    if (!username || !birthdate || !email || !password || !bio) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ username, birthdate, email, password, bio });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();

    const token = jwt.sign(...JWT_SIGN(newUser));
    res.json({ token });
}

module.exports = { LoginToken, LoginUser, RegisterUser };
