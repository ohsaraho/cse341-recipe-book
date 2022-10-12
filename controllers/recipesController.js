const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllIDs = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('recipes_project').collection('recipes').find();
    result.toArray().then((documents) => {
      res.json(documents);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleID = async (req, res) => {
  try {
    const documentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('recipes_project').collection('recipes').find({ _id: documentId });
    result.toArray().then((document) => {
      res.json(document[0])
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewRecipe = async (req, res) => {
  try {
    const recipe = {
      recipeName: req.body.recipeName,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      prepareTime: req.body.prepareTime
    };

    const response = await mongodb.getDb().db('recipes_project').collection('recipes').insertOne(recipe);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred while trying to create the recipe.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const documentId = new ObjectId(req.params.id);
    const updaterecipeDoc = {
      recipeName: req.body.recipeName,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      prepareTime: req.body.prepareTime

    };
    
    // Changes just the favoriteColor // Use updateOne because it keeps the data that is already there and updates the new fields but replaceOne replaces the whole document
    // The $set operator allows you to replace a field that you specified with that value
    // let updaterecipeDoc = {
    //   $set: { favoriteColor: "Green" }
    // };

    const response = await mongodb.getDb().db('recipes_project').collection('recipes').replaceOne({ _id: documentId }, updaterecipeDoc);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while trying to update the recipe.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const deleteRecipe = async (req, res) => {
  try {
    const documentId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db('recipes_project').collection('recipes').deleteOne({ _id: documentId }, true);

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while trying to delete the recipe.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllIDs, getSingleID, createNewRecipe, updateRecipe, deleteRecipe };