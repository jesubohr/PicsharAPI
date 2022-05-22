const router = require('express').Router();
const { WithEmailAndPassword } = require('../controllers/login.controller');
const { RegisterUser } = require('../controllers/register.controller');

router.post('/login', WithEmailAndPassword);

router.post('/register', RegisterUser);

module.exports = router;
