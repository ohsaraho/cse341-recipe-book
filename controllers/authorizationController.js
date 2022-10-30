const { json } = require("express");
const config = require("../config/OAuth");
// const dotenv = require('dotenv');
// dotenv.config();
// const axios = require("axios");



const AuthorizationController = {
  login: (req, res) => {
    const authorizationURL = `${
      config.authorizationHost
    }/authorize?response_type=code&client_id=${
      config.clientID
    }&redirect_uri=${encodeURIComponent(
      config.redirectUrl
    )}&scope=openid%20profile%20email`;

    res.redirect(authorizationURL);
  },
  callback: async (req, res) => {
    const response = await fetch(`${config.authorizationHost}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: config.clientID,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUrl,
        scope: "openid profile email",
        code: req.query.code,
      }),
    }
  );

  const json = await response.json();

  res.json(json);
  },
};

module.exports = AuthorizationController;

// const AuthorizationController = {
//   login: (req, res) => {
//     const authorizationURL = `${
//       authorizationHost
//     }/authorize?response_type=code&client_id=${
//       clientID
//     }&redirect_uri=${encodeURIComponent(
//       redirectUrl
//     )}&scope=openid%20profile%20email`;

//     res.redirect(authorizationURL);
//   },

//   callback: async (req, res) => {
//     const response = await fetch(
//       "https://cse-341-testing.us.auth0.com/oauth/token",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           grant_type: "authorization_code",
//           client_id: clientID,
//           client_secret: clientSecret,
//           redirect_uri: redirectUrl,
//           scope: "openid profile email",
//           code: req.query.code,
//         }),
//       }
//     );

//     const json = await response.json();

//     res.json(json);
//   },
// };

// module.exports = AuthorizationController;