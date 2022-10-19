const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserByName);

// router.get('/:tags', usersController.getUserByName)

router.post('/', usersController.createNewUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController. deleteUser);

module.exports = router;