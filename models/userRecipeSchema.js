const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  quantity: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const userRecipeSchema = new Schema({
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
  },
});

module.exports = userRecipeSchema;