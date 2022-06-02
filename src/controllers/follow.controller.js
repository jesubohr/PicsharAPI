const Follow = require('../models/Follow.model');

async function makeValidations(this_user, user_id, res) {
    if (this_user == undefined) res.status(400).json({ error: 'no session logged in' });
    if (user_id == undefined) res.status(400).json({ error: 'no user_id' });
    const this_follows_user = await Follow.find({ follower: this_user, followed: user_id });
    if (this_follows_user.length == 0) res.status(100).json({ error: "you don't follow this user" });
    return true;
}

async function GetFollowing(req, res) {
    const { user_id } = req.query; 
    const this_user = req.user;
    if (this_user == undefined) res.status(400).json({ error: 'no session logged in' });
    if (user_id == undefined) res.status(400).json({ error: 'no user_id' });
    const this_follows_user = await Follow.find({ follower: this_user, followed: user_id });
    if (this_follows_user.length == 0) res.status(100).json({ error: "you don't follow this user" });
    try {
        // make a match with the user_id ans then an agregation with user
        const users = await Follow.aggregate([
            { $match: { follower: user_id } },
            { $lookup: { from: 'User', localField: 'followed', foreignField: '_id', as: 'users' } },
            { $project: { 'users.password': 0 } }
        ]);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

async function GetFollowers(req, res) {
    const { user_id } = req.query;
    try {
        // Something here
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

async function RequestFollow(req, res) {
    const { user_id } = req.body;
    try {
        // Something here
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

async function ResponseFollow(req, res) {
    const { user_id } = req.body;
    try {
        // Something here
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

module.exports = { GetFollowing, GetFollowers, RequestFollow, ResponseFollow }