const router = require('express').Router();
const { authWithToken } = require('../middleware/auth');
const { getUserInfo } = require('../controllers/user.controller');

router.get('/', authWithToken, getUserInfo);

module.exports = router;
