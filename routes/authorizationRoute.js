// const express = require('express');
const express = require('express');
const router = express.Router();
// const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();




const recipesController = require('../controllers/recipesController');

// router.get('/', recipesController.getAllRecipes);

// router.get('/:recipeName', recipesController.getSingleRecipe);


// router.post('/', recipesController.createNewRecipe);

// router.put('/:recipeName', recipesController.updateRecipe);

// router.delete('/:recipeName', recipesController. deleteRecipe);


// const port = process.env.PORT || 8080;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // res.send('login endpoint');
  // res.redirect('http://localhost:8080/api-docs/')
  console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;