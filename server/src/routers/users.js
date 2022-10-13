const express = require('express');
const { getAllUsers, createNewUser,  editUserById, getUserById, login} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', createNewUser);
router.post('/login', login);
router.patch('/:id/', editUserById);

module.exports = router;
