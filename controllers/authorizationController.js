// const appConfig = require("../config/app");
const dotenv = require('dotenv');
dotenv.config();
const axios = require("axios");

const AuthorizationController = {
  login: (req, res) => {
    const authorizationURL = `${
      appConfig.authorizationHost
    }/authorize?response_type=code&client_id=${
      appConfig.clientID
    }&redirect_uri=${encodeURIComponent(
      appConfig.redirectUrl
    )}&scope=openid%20profile%20email`;

    res.redirect(authorizationURL);
  },

  callback: async (req, res) => {
    const response = await fetch(
      "https://cse-341-testing.us.auth0.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: appConfig.clientID,
          client_secret: appConfig.clientSecret,
          redirect_uri: appConfig.redirectUrl,
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