const { Schema } = require('mongoose');

const ingredientSchema = new Schema({
  quantity: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = (mongoose) => {
    const recipeSchema = mongoose.model(
      'recipes',
      mongoose.Schema({
        recipeName: {
          type: String
        },
        ingredients: {
          type: [ingredientSchema]
        },
        instructions: {
          type: [String]
        },
        prepareTime: {
            type: String
        },
        tags: {
          type: [String]
        }
      })
    );
  
    return recipeSchema;
  };

// const { Schema, model } = require("mongoose");

// const recipeSchema = new Schema({
//   recipeName: {
//     type: String, required: true
//   },
//   ingredients: {
//     type: [{String}], required: true
//   },
//   instructions: {
//     type: [String], required: true
//   },
//   prepareTime: {
//       type: String, required: true
//   },
//   tags: {
//     type: [String], required: true
//   }
// });

// module.exports = recipeSchema;