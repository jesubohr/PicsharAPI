const User = require('../models/User.model');

async function UserInfo (req, res) {
    const { user_id } = req.query;
    try {
        const user = await User.findById(user_id).select('-password -birthdate');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

module.exports = { UserInfo };
