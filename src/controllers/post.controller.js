const Post = require('../models/Post.model');
const User = requie('../models/User.model');

async function getPosts (req, res) {
    const { author } = req.query;
    try {
        const posts = await Post.find({owner : author});
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
}