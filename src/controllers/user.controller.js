const User = require('../models/User.model');
const LikedPost = require('../models/LikedPost.model');
const Post = require('../models/Post.model');
const Follow = require('../models/Follow.model');

async function UserInfo (req, res) {
    const { user_id } = req.query;
    try {
        const user = await User.findById(user_id).select('-password -birthdate');
        const likedPosts = await LikedPost.countDocuments({user: user_id});
        const userPosts = await Post.countDocuments({author: user_id});
        const followers = await Follow.countDocuments({followed: user_id});
        const following = await Follow.countDocuments({follower: user_id});

        res.json({ user, liked: likedPosts, posts: userPosts, followers: followers, following: following });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user_id', stack: error });
    }
}

module.exports = { UserInfo };
