const express = require('express');
const router = express.Router();

const loadUser = require("../middleWare/loadUser")
const recipesController = require('../controllers/userRecipesController');

router.use([loadUser]);

router.get("/", recipesController.index);

module.exports = router;