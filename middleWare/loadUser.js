// const appConfig = require("../config/app");
// const dotenv = require('dotenv');
// dotenv.config();
const config = require("../config/OAuth");
// const User = require("../models/user");
const db = require('../models');
const User = db.user;

const loadUser = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const authZeroUser = fetchAuthZeroUser(req.headers.authorization);
  // const authZeroUser = req.headers.authorization;

  const user = await findOrCreateUser(authZeroUser);

  console.log(user);
  // console.log(authZeroUser);
  next();
};

const fetchAuthZeroUser = async (authorizationValue) => {

  // It does get the token
  // console.log("Is token present: ", authorizationValue);

  // It returns the correct url
  // console.log(config.authorizationHost);

  const response = await fetch(`${config.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue },
  });

  // const text = await response.text();
  // console.log(text);

  return response.json();
};

const findOrCreateUser = async (authZeroUserJson) => {
  if (!authZeroUserJson) return;

  const existingUser = await User.findOne({ identifier: authZeroUserJson.sub });
  console.log(authZeroUserJson.sub)

  if (existingUser) return existingUser;

  // const user = new User(req.body);
  const newUser = await User.save({
    identifier: authZeroUserJson.sub,
    email: authZeroUserJson.email,
    givenName: authZeroUserJson.given_name,
    familyName: authZeroUserJson.family_name,
    locale: authZeroUserJson.locale,
    picture: authZeroUserJson.picture,
  });
  console.log(newUser);
  return newUser;
  
};



const parseToken = (req) => {
  // Parse out the token. The token is in the Authorization header like this:
  // Authorization: Bearer <token>

  return req.headers.authorization.split(" ")[1];
};

module.exports = loadUser;