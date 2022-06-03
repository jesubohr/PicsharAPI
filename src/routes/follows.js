const router = require('express').Router();
const { authWithToken } = require('../middleware/auth');
const { GetFollowing, GetFollowers, RequestFollow, ResponseFollow } = require('../controllers/follow.controller');

router.get('/following', authWithToken, GetFollowing);
router.get('/followers', authWithToken, GetFollowers);
router.post('/request', authWithToken, RequestFollow);
router.post('/response', authWithToken, ResponseFollow);


module.exports = router;
