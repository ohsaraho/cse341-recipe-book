const getFavoriteRecipe = {
    index: (req, res) => {
        if (!req.user) {
            return res.status(401).send("Not Authenticated");
          }
        res.json(req.user.favoriteRecipe);
        // console.log("What is happening")
    },
};

module.exports = getFavoriteRecipe;


// const ScripturesController = {
//     index: (req, res) => {
//       if (!req.user) {
//         return res.status(401).send("Not Authenticated");
//       }
  
//       res.json(req.user.favoriteScriptures);
//     },
//   };
  
//   module.exports = ScripturesController;


// const getFavoriteRecipe = async (req, res) => {
//     res.json(req.user.favoriteRecipe);
//   };

// module.exports = getFavoriteRecipe;