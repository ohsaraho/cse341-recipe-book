module.exports = (mongoose) => {
    const recipeSchema = mongoose.model(
      'recipes',
      mongoose.Schema({
        recipeName: {
          type: String
        },
        ingredients: {
          type: [{String}]
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