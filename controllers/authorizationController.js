const config = require("../config/OAuth");


const AuthorizationController = {
  login: (req, res) => {
    console.log("===== In Login Controller =====");
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
    try {
      console.log("===== In Callback Controller =====");
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
  } catch (error) {
    next(error);
  }
  },
};

module.exports = AuthorizationController;

