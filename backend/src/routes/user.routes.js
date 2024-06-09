const {createUser, getAllUsers,login} = require('../controllers/user.controller')
const router = require('express').Router();

router.post('/user/create',createUser);
router.post('/user/login',login);
router.get('/all',getAllUsers);

module.exports = router;