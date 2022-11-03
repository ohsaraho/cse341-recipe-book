const { user } = require('../models');
const Recipe = require('../models/recipe');
// const Recipe = db.recipe;
// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../validation/passwordCheck');
const { userSchema } = require('../validation/schemaValidation');

const getFavoriteRecipe = async (req, res) => {
    res.json(req.user.favoriteRecipe);
  };


const getAllRecipes = async (req, res) => {
  try {
    // const result = await mongodb.getDb().db('recipes_project').collection('recipes').find();
    // result.toArray().then((documents) => {
    //   res.json(documents);
    // });
    Recipe.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getSingleRecipe = async (req, res) => {
//   try {

//     if (!req.params.recipeName) {
//       res.status(400).json('Must use a valid recipe name to find a recipe.');
//       return;
//     }

//     const recipeName = req.params.recipeName;
//     Recipe.find({ recipeName: recipeName }).then((document) => {
//       res.json(document[0])
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// you can only have one get by id, name or tag; not multiple
const getSingleRecipe = async (req, res) => {

  try {
    const tags = req.params.tags;
    Recipe.find({ tags: tags }).then((data) => {
      res.json(data[0])
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewRecipe = async (req, res) => {
  try {

    if (!req.body.recipeName || !req.body.ingredients || !req.body.instructions || !req.body.prepareTime || !req.body.tags) {
      res.status(400).send({ message: 'Input can not be empty!' });
      return;
    }

    // const recipe = {
    //   recipeName: req.body.recipeName,
    //   ingredients: req.body.ingredients,
    //   instructions: req.body.instructions,
    //   prepareTime: req.body.prepareTime,
    //   tags: req.body.tags
    // };
    const recipe = new Recipe(req.body);

    recipe.save().then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the recipe.'
      });
    });
} catch (err) {
  res.status(500).json(err);
}
};

const updateRecipe = async (req, res) => {
  try {

    if (!req.body.recipeName || !req.body.ingredients || !req.body.instructions || !req.body.prepareTime || !req.body.tags) {
      res.status(400).send({ message: 'Input can not be empty!' });
      return;
    }
    const recipeName = req.params.recipeName;

    // if (!recipeName) {
    //   res.status(400).send({ message: 'Recipe Name Invalid' });
    //   return;
    // }

    // const updaterecipeDoc = {
    //   recipeName: req.body.recipeName,
    //   ingredients: req.body.ingredients,
    //   instructions: req.body.instructions,
    //   prepareTime: req.body.prepareTime,
    //   tags: req.body.tags

    // };
    
    // Changes just the favoriteColor // Use updateOne because it keeps the data that is already there and updates the new fields but replaceOne replaces the whole document
    // The $set operator allows you to replace a field that you specified with that value
    // let updaterecipeDoc = {
    //   $set: { favoriteColor: "Green" }
    // };

    Recipe.findOne({ recipeName: recipeName }, function (err, recipe) {
      recipe.recipeName = req.body.recipeName;
      recipe.ingredients = req.body.ingredients;
      recipe.instructions = req.body.instructions;
      recipe.prepareTime = req.body.prepareTime;
      recipe.tags = req.body.tags;
      // recipe.body = req.body;
      recipe.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the user.');
        } else {
          res.status(204).send();
        }
      })
    });

    // if (response.modifiedCount > 0) {
    //   res.status(204).send();
    // } else {
    //   res.status(500).json(response.error || 'An error occurred while trying to update the recipe.');
    // }
  } catch (err) {
    res.status(500).json(err);
  }
};


const deleteRecipe = async (req, res) => {
  try {

    const recipeName = req.params.recipeName;

    if (!recipeName) {
      res.status(400).send({ message: 'Recipe Name Invalid' });
      return;
    }

    Recipe.deleteOne({ recipeName: recipeName }, (err, result) =>  {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the recipe.');
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllRecipes, getSingleRecipe, createNewRecipe, updateRecipe, deleteRecipe };
// getFavoriteRecipe,