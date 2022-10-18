const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllIDs);

router.get('/:id', usersController.getSingleID);

// router.get('/:tags', usersController.getUserByName)

router.post('/', usersController.createNewUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController. deleteUser);

module.exports = router;