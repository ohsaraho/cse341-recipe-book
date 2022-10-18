const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllIDs = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('recipes_project').collection('users').find();
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
    const result = await mongodb.getDb().db('recipes_project').collection('users').find({ _id: documentId });
    result.toArray().then((document) => {
      res.json(document[0])
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// you can only have one get by id, name or tag; not multiple
const getUserByName= async (req, res) => {
  try {
    const tags = req.params.tags;
    const result = await mongodb.getDb().db('recipes_project').collection('users').find({ tags: tags });
    result.toArray().then((data) => {
      res.json(data[0])
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewUser = async (req, res) => {
  try {
    const user = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    };

    const response = await mongodb.getDb().db('recipes_project').collection('users').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred while trying to create the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const documentId = new ObjectId(req.params.id);
    const updateUserDoc = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    };
    
    // Changes just the favoriteColor // Use updateOne because it keeps the data that is already there and updates the new fields but replaceOne replaces the whole document
    // The $set operator allows you to replace a field that you specified with that value
    // let updateUserDoc = {
    //   $set: { favoriteColor: "Green" }
    // };

    const response = await mongodb.getDb().db('recipes_project').collection('users').replaceOne({ _id: documentId }, updateUserDoc);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while trying to update the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const deleteUser = async (req, res) => {
  try {
    const documentId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db('recipes_project').collection('users').deleteOne({ _id: documentId }, true);

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while trying to delete the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllIDs, getSingleID, createNewUser, updateUser, deleteUser, getUserByName };