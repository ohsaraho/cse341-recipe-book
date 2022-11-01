const Recipe = require("./recipe");
// const db = require('../models');
// const Recipe = db.recipe;
module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      // userName: {
      //   type: String, required: true
      // },
      // email: {
      //   type: String, required: true
      // },
      // password: {
      //   type: String, required: true
      // },
      identifier: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      givenName: { type: String, required: true },
      familyName: { type: String, required: true },
      locale: { type: String, required: true },
      picture: { type: String },
      // favoriteRecipe: [Recipe],
    });
  
    return mongoose.model('users', userSchema);
  };
