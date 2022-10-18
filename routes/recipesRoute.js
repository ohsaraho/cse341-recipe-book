const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getAllIDs);

router.get('/:id', recipesController.getSingleID);

// router.get('/:tags', recipesController.getRecipeByName)

router.post('/', recipesController.createNewRecipe);

router.put('/:id', recipesController.updateRecipe);

router.delete('/:id', recipesController. deleteRecipe);

module.exports = router;