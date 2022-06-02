const Post = require('../models/Post.model');

async function CreatePost (req, res) {
    const {bio, image_url, author } = req.body;
    if(!bio || !image_url || !author) return res.status(400).json({ error: 'You must fill all the fields' });
    try {
        const post = await Post.create({ bio, image_url, author });
        res.json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Invalid post', stack: error });
    }
}

async function FindPosts(req, res){
    const {author} = req.query;
    const user_id = req.user;
    try {

        const posts = await Post.find({owner : author});
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user', stack: error });
    }
}

async function LikePost (req, res) {
    const { post_id} = req.body;
    const user_id = req.user;
    if(!post_id) return res.status(400).json({ error: 'You must fill all the fields' });
    try {
        const post = await Post.findById(post_id);
        if(!post) return res.status(400).json({ error: 'Invalid post' });
        if(post.likes.includes(user_id)) return res.status(400).json({ error: 'You already liked this post' });
        post.likes.push(user_id);
        await post.save();
        res.json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Invalid post', stack: error });
    }
}

async function PostLikedBy(req, res){
    const { user_id } = req.query;
    try {
        const posts = await Post.filter(post => post.likes.includes(user_id));
        console.log(posts)
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user', stack: error });
    }
}

module.exports = { CreatePost, FindPosts, LikePost, PostLikedBy};
