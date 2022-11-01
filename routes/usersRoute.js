const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.get('/:email', usersController.getUserByEmail);

// router.get('/:tags', usersController.getUserByName)

router.post('/', usersController.createNewUser);

router.put('/:email', usersController.updateUser);

router.delete('/:email', usersController.deleteUser);

module.exports = router;