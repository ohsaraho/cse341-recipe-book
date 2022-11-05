const getFavoriteRecipe = {
    index: (req, res) => {
        if (!req.user) {
            return res.status(401).send("Not Authenticated");
          }
        res.json(req.user.favoriteRecipe);
        // console.log("What is happening", req.user);
    },
};

module.exports = getFavoriteRecipe;
