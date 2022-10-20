const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../validation/passwordCheck');
const { userSchema } = require('../validation/schemaValidation');


const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('recipes_project').collection('users').find();
    result.toArray().then((documents) => {
      res.json(documents);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserByName = async (req, res) => {
  try {

    if (!req.params.userName) {
      res.status(400).json('Must use a valid username to find a user.');
    }

    const userName = req.params.userName;
    const result = await mongodb.getDb().db('recipes_project').collection('users').find({ userName: userName });
    result.toArray().then((document) => {
      res.json(document[0])
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewUser = async (req, res) => {
  try {

    if (!req.body.userName || !req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Input can not be empty!' });
      return;
    }

    const user = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    };

    const schemaValidationCheck = await userSchema.validateAsync(user);
    // console.log(schemaValidationCheck);

    if (schemaValidationCheck.error) {
      res.status(400).send({ message: schemaValidationCheck.error });
      return;
    }

    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);

    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }

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

    if (!req.body.userName || !req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Input can not be empty!' });
      return;
    }

    const userName = req.params.userName;

    // if (!userName) {
    //   res.status(400).send({ message: 'Username Invalid' });
    //   return;
    // }

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

    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }

    const response = await mongodb.getDb().db('recipes_project').collection('users').replaceOne({ userName: userName }, updateUserDoc);

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
    const userName = req.params.userName;

    if (!userName) {
      res.status(400).send({ message: 'Username Invalid' });
      return;
    }

    const response = await mongodb.getDb().db('recipes_project').collection('users').deleteOne({ userName: userName }, true);

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while trying to delete the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUserByName, createNewUser, updateUser, deleteUser };