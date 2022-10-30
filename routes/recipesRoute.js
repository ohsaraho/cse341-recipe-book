const express = require('express');
const router = express.Router();

const loadUser = require("../middleWare/loadUser")
const recipesController = require('../controllers/recipesController');

router.use([loadUser]);

// router.get("/", recipesController.getFavoriteRecipe);


router.get('/', recipesController.getAllRecipes);

router.get('/:recipeName', recipesController.getSingleRecipe);

// router.get('/:tags', recipesController.getRecipeByName)

router.post('/', recipesController.createNewRecipe);

router.put('/:recipeName', recipesController.updateRecipe);

router.delete('/:recipeName', recipesController.deleteRecipe);

module.exports = router;