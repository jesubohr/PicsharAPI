const router = require('express').Router();
const { CreatePost, FindPosts, LikePost, PostLikedBy, CommentPost, SavePost, GetPost, GetPostRouter, PostSavedBy} = require('../controllers/post.controller');
const { authWithToken } = require('../middleware/auth');

router.post('/', CreatePost);
router.get('/', authWithToken, GetPostRouter)
router.post('/like', authWithToken, LikePost)
router.get('/liked-by', PostLikedBy)
router.get('/saved-by', PostSavedBy)
router.post('/comment', CommentPost)
router.post('/save', authWithToken, SavePost)
module.exports = router;
