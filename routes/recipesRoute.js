const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getAllRecipes);

router.get('/:recipeName', recipesController.getSingleRecipe);

// router.get('/:tags', recipesController.getRecipeByName)

router.post('/', recipesController.createNewRecipe);

router.put('/:recipeName', recipesController.updateRecipe);

router.delete('/:recipeName', recipesController. deleteRecipe);

module.exports = router;