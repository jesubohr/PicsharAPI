const router = require('express').Router();
const { LoginToken, LoginUser, RegisterUser } = require('../controllers/auth.controller');
const { UserInfo } = require('../controllers/user.controller');

router.get('/', UserInfo);

router.post('/', RegisterUser);
router.post('/login', (req, res) => {
    const { token } = req.body;
    if (!token) LoginUser(req, res);
    else LoginToken(req, res);
});

module.exports = router;
