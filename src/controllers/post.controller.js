const Post = require('../models/Post.model');

async function CreatePost (req, res) {
    const { title, content, image, owner } = req.body;
    if(!title || !content || !owner || !image) return res.status(400).json({ error: 'You must fill all the fields' });
    try {
        const post = await Post.create({ title, content, image, owner });
        res.json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Invalid post', stack: error });
    }
}

async function FindPosts(req, res){
    const {author} = req.query;
    try {
        const posts = await Post.filter(post => post.owner == author);
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
    if(!user_id) return res.status(400).json({ error: 'You must fill all the fields' });
    try {
        const posts = await Post.filter(post => post.likes.includes(user_id));
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user', stack: error });
    }
}

module.exports = { CreatePost, FindPosts, LikePost, PostLikedBy};
