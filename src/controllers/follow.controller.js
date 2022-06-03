const Follow = require('../models/Follow.model');
const Request = require('../models/Request.model');
const DeniedRequest = require('../models/DeniedRequest.model');

async function GetFollowing(req, res) {
    const { user_id } = req.query; 
    const this_user = req.user;
    if (this_user == undefined) res.status(400).json({ error: 'no session logged in' });
    if (user_id == undefined) res.status(400).json({ error: 'no user_id' });
    const this_follows_user = await Follow.find({ follower: this_user, followed: user_id });
    if (this_follows_user.length == 0 && this_user != user_id) res.status(100).json({ error: "you don't follow this user" });
    try {
        // make a match with the user_id ans then an agregation with user
        const users = await Follow.aggregate([
            { $match: { follower: user_id } },
            { $lookup: { from: 'User', localField: 'followed', foreignField: '_id', as: 'users' } },
            { $unwind: '$users' },
            { $project: { users: 1 } }
        ]);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

async function GetFollowers(req, res) {
    const { user_id } = req.query; 
    const this_user = req.user;
    if (this_user == undefined) res.status(400).json({ error: 'no session logged in' });
    if (user_id == undefined) res.status(400).json({ error: 'no user_id' });
    const this_follows_user = await Follow.find({ follower: this_user, followed: user_id });
    if (this_follows_user.length == 0 && this_user != user_id) res.status(100).json({ error: "you don't follow this user" });
    try {
        // make a match with the user_id ans then an agregation with user
        const users = await Follow.aggregate([
            { $match: { followed: user_id } },
            { $lookup: { from: 'User', localField: 'follower', foreignField: '_id', as: 'users' } },
            { $unwind: '$users' },
            { $project: { users: 1 } }
        ]);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

async function RequestFollow(req, res) {
    const { user_id } = req.body;
    const this_user = req.user;
    if (this_user == undefined) res.status(400).json({ error: 'no session logged in' });
    if (user_id == undefined) res.status(400).json({ error: 'no user_id' });
    if (this_user == user_id) res.status(400).json({ error: 'you can\'t follow yourself' });
    const this_follows_user = await Follow.find({ follower: this_user, followed: user_id });
    if (this_follows_user.length > 0) res.status(100).json({ error: "you already follow this user" });
    try {
        const newRequest = new Request({ userOrigin: this_user, userDestination: user_id });
        await newRequest.save();
        res.status(200).json({ message: 'request sent' });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

async function ResponseFollow(req, res) {
    const { request_id, action } = req.body;
    const this_user = req.user;
    if (this_user == undefined) res.status(400).json({ error: 'no session logged in' });
    const request = await Request.findById(request_id);
    if (request.userDestination != this_user) res.status(400).json({ error: 'you can\'t respond to this request' });
    try {
        if (action == 'accept') {
            const newFollow = new Follow({ follower: request.userOrigin, followed: request.userDestination });
            await newFollow.save();
            await Request.findByIdAndDelete(request_id);
        } else if (action == 'reject') {
            const newDeniedRequest = new DeniedRequest({ userOrigin: request.userOrigin, userDestination: request.userDestination });
            await newDeniedRequest.save();
            await Request.findByIdAndDelete(request_id);
        }
        res.status(200).json({ message: 'request responsed' });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

module.exports = { GetFollowing, GetFollowers, RequestFollow, ResponseFollow }