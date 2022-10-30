const RecipeSchema = require("./recipe").Schema;
module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      userName: {
        type: String, required: true
      },
      email: {
        type: String, required: true
      },
      password: {
        type: String, required: true
      },
      // identifier: { type: String, unique: true, required: true },
      // email: { type: String, unique: true, required: true },
      // givenName: { type: String, required: true },
      // familyName: { type: String, required: true },
      // locale: { type: String, required: true },
      // picture: { type: String },
      // favoriteRecipe: [RecipeSchema],
    });
  
    return mongoose.model('users', userSchema);
  };


//   const { Schema, model } = require('mongoose');
//   const userSchema = new Schema({
//     username: {
//       type: String
//     },
//     email: {
//       type: String
//     },
//     password: {
//       type: String
//     },
//   });


// const User = model('users', userSchema);
// module.exports = User;

  // module.exports = (mongoose) => {
  //   const userSchema = mongoose.model(
  //     'users',
  //     mongoose.Schema({
  //     username: {
  //       type: String
  //     },
  //     email: {
  //       type: String
  //     },
  //     password: {
  //       type: String
  //     }
  //   })
  // );
  
  //   return userSchema;
  // };