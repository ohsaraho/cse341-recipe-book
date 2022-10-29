const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.get('/:userName', usersController.getUserByName);

// router.get('/:tags', usersController.getUserByName)

router.post('/', usersController.createNewUser);

router.put('/:userName', usersController.updateUser);

router.delete('/:userName', usersController.deleteUser);

module.exports = router;