const router = require('express').Router();
const { WithEmailAndPassword, WithToken } = require('../controllers/login.controller');
const { RegisterUser } = require('../controllers/register.controller');

router.post('/login', WithEmailAndPassword);
router.post('/login/token', WithToken);

router.post('/register', RegisterUser);

module.exports = router;
