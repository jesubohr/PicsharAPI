const router = require('express').Router();
const { PostPostRouter, LikePost, PostLikedBy, CommentPost, SavePost, GetPostRouter, PostSavedBy, GetTimeline} = require('../controllers/post.controller');
const { authWithToken } = require('../middleware/auth');

router.post('/', PostPostRouter);
router.get('/', authWithToken, GetPostRouter)
router.post('/like', authWithToken, LikePost)
router.get('/liked-by', PostLikedBy)
router.get('/saved-by', PostSavedBy)
router.post('/save', authWithToken, SavePost)
router.get('/timeline', GetTimeline)

module.exports = router;
