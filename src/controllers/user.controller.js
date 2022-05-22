const User = require('../models/user.model');

async function UserInfo (req, res) {
    const { user_id } = req.query;
    try {
        const user = await User.findByuser_id(user_id).select('-password -birthday');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

module.exports = { UserInfo };
