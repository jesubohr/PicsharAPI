const router = require('express').Router();
const { CreatePost, FindPosts, LikePost, PostLikedBy } = require('../controllers/post.controller');
const { authWithToken } = require('../middleware/auth');

router.post('/', CreatePost);
router.get('/', authWithToken, FindPosts)
router.post('/like', authWithToken, LikePost)
router.get('/liked-by', PostLikedBy)
module.exports = router;