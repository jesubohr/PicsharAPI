const User = require('../models/User.model');

async function RegisterUser (req, res) {
    const { name, birthday, email, password } = req.body;

    if (!name || !birthday || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({ name, birthday, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.json({ msg: 'User created successfully' });
}

module.exports = { RegisterUser };
