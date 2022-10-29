module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      // username: {
      //   type: String
      // },
      // email: {
      //   type: String
      // },
      // password: {
      //   type: String
      // },
      identifier: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      givenName: { type: String, required: true },
      familyName: { type: String, required: true },
      locale: { type: String, required: true },
      picture: { type: String },
  // favoriteScriptures: [ScriptureSchema],
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