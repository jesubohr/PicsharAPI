const User = require('../models/user.model');

async function getUserInfo (req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password -birthday');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

module.exports = { getUserInfo };
