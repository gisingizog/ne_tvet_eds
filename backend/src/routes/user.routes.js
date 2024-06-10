const {createUser, getAllUsers,getUserById,login, updateUser} = require('../controllers/user.controller')
const router = require('express').Router();

router.post('/user/create',createUser);
router.post('/user/login',login);
router.get('/all',getAllUsers);
router.get('/:id',getUserById);
router.put('/:id',updateUser)
module.exports = router;