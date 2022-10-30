const db = require('../models');
const User = db.user;
// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../validation/passwordCheck');
const { userSchema } = require('../validation/schemaValidation');


const getAllUsers = async (req, res) => {
  try {
    // const result = await mongodb.getDb().db('recipes_project').collection('users').find();
    // result.toArray().then((documents) => {
    //   res.json(documents);
    // });
    User.find({})
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

const getUserByName = async (req, res) => {
  try {

    if (!req.params.userName) {
      res.status(400).json('Must use a valid username to find a user.');
    }

    const userName = req.params.userName;
    User.find({ userName: userName }).then((document) => {
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
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const user = new User(req.body);
    // console.log(user);
    // const schemaValidationCheck = await userSchema.validateAsync(user);
    // console.log(schemaValidationCheck);

    // if (schemaValidationCheck.error) {
    //   res.status(400).send({ message: schemaValidationCheck.error });
    //   return;
    // }
    user
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userName = req.params.userName;
    if (!userName) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    User.findOne({ userName: userName }, function (err, user) {
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the user.');
        } else {
          res.status(204).send();
        }
      });
    });
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

    User.deleteOne({ userName: userName }, (err, result) =>  {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the user.');
      } else {
        res.status(204).send(result);
      }
    });

    // if (response.deletedCount > 0) {
    //   res.status(200).send();
    // } else {
    //   res.status(500).json(response.error || 'An error occurred while trying to delete the user.');
    // }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUserByName, createNewUser, updateUser, deleteUser };