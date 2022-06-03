const router = require('express').Router();
const { CreatePost, LikePost, PostLikedBy, CommentPost, SavePost, GetPostRouter, PostSavedBy, GetTimeline} = require('../controllers/post.controller');
const { authWithToken } = require('../middleware/auth');

router.post('/', CreatePost);
router.get('/', authWithToken, GetPostRouter)
router.post('/like', authWithToken, LikePost)
router.get('/liked-by', PostLikedBy)
router.get('/saved-by', PostSavedBy)
router.post('/comment', CommentPost)
router.post('/save', authWithToken, SavePost)
router.get('/timeline', GetTimeline)

module.exports = router;
