const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');
const SavedPost = require('../models/SavedPost.model');
const LikedPost = require('../models/LikedPost.model');
const Follow = require('../models/Follow.model');

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
    try {
        const posts = await Post.find({author: author});
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user', stack: error });
    }
}

async function LikePost (req, res) {
    const { post_id} = req.body;
    const user_id = req.user;
    const alreadyLiked = await LikedPost.findOne({ user: user_id, post: post_id });
    if(alreadyLiked) return res.status(400).json({ error: 'You already liked this post' });
    try {
       const like = await LikedPost.create({ user: user_id, post: post_id });
        res.json({ like });
    } catch (error) {
        res.status(500).json({ error: 'Invalid post', stack: error });
    }
}

async function PostLikedBy(req, res){
    const { user_id } = req.query;
    try {
        const likedPosts = await LikedPost.find({user : user_id});
        const posts = await Post.find({_id: {$in: likedPosts.map(post => post.post)}});
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user', stack: error });
    }
}

async function PostSavedBy(req, res){
    const { user_id } = req.query;
    try {
        const savedPosts = await SavedPost.find({user : user_id});
        const posts = await Post.find({_id: {$in: savedPosts.map(post => post.post)}});
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Invalid user', stack: error });
    }
}

async function GetPost(req, res){
    const {post_id} = req.query;
    try {
        const post = await Post.findById(post_id);
        const likes = await LikedPost.countDocuments({post: post_id});
        const comments = await Comment.find({post: post_id});
        res.json({ ...post, likes: likes, comments: comments });
    } catch (error) {
        res.status(500).json({ error: 'Invalid post', stack: error });
    }
}

async function CommentPost(req, res){
    const {post_id, comment} = req.body;
    const post = await Post.findById(post_id);
    const user_id = post.author;
    try {
        const com = await Comment.create({ content: comment, owner: user_id, post: post_id });
        res.json({ comment: com });
    }catch (error) {
        res.status(500).json({ error: 'Invalid Comment', stack: error });
    }
}

async function SavePost(req, res){
    const {post_id} = req.body;
    const user_id = req.user;
    try {
        const savedPost = await SavedPost.create({ user: user_id, post: post_id });
        res.json({ savedPost });
    } catch (error) {
        res.status(500).json({ error: 'Invalid post', stack: error });
    }
}

async function GetTimeline(req, res){
    const {user_id} = req.body
    try {
        const follows = await Follow.find({follower: user_id});
        const posts = await Post.find({author: {$in: follows.map(follow => follow.followed)}});
        res.json({ posts });
    }catch (error) {
        res.status(500).json({ error: 'Invalid user', stack: error });
    }
}

async function GetPostRouter(req, res){
    const {post_id} = req.query;
    if(post_id) return GetPost(req, res);
    FindPosts(req, res);
}

async function PostPostRouter(req, res){
    const {post_id} = req.body;
    if(post_id) return CommentPost(req, res);
    CreatePost(req, res);
}

module.exports = { PostPostRouter, LikePost, PostLikedBy, SavePost, GetPostRouter, PostSavedBy, GetTimeline};
