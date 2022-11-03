const { Schema, model } = require("mongoose");
const Recipe = require("./userRecipeSchema");

const userSchema = new Schema({
  identifier: { type: String, unique: true },
  email: { type: String, unique: true },
  givenName: { type: String },
  familyName: { type: String },
  locale: { type: String },
  picture: { type: String },
  favoriteRecipe: [Recipe],
});

module.exports = model("users", userSchema);



// const Recipe = require("./recipe");
// const db = require('./recipe');
// const Recipe = db.recipe;

// console.log("Console.logging!!!", Recipe)
// const db = require('../models');
// const Recipe = db.recipe;
// module.exports = (mongoose) => {
//     const userSchema = mongoose.Schema({
//       userName: {
//         type: String, required: true
//       },
//       email: {
//         type: String, required: true
//       },
//       password: {
//         type: String, required: true
//       },
//       identifier: { type: String, unique: true },
//       email: { type: String, unique: true },
//       givenName: { type: String },
//       familyName: { type: String },
//       locale: { type: String },
//       picture: { type: String },
//       favoriteRecipe: [Recipe],
//     });
  
//     return mongoose.model('users', userSchema);
//   };
