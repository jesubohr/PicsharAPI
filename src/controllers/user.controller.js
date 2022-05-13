const User = require('../models/user.model');

async function getUserInfo (req, res) {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    res.json({ user });
}

module.exports = { getUserInfo };
