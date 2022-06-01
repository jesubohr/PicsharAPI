const router = require('express').Router();
const {CreatePost, FindPosts, LikePost, PostLikedBy} = require('../controllers/post.controller');

router.post('/', CreatePost);
router.get('/', FindPosts)
router.post('/like', LikePost)
router.get('/liked-by', PostLikedBy)
module.exports = router;
