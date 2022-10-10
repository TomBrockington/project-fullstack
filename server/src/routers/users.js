const express = require('express');
const { getAllUsers, createNewUser,  editUserById, getUserById} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createNewUser);
router.patch('/:id/', editUserById);

module.exports = router;
