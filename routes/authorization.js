const { Router } = require("express");
const AuthorizationController = require("../controllers/authorizationController");

const router = Router();

router.get("/login", AuthorizationController.login);
router.get("/callback", AuthorizationController.callback);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// router.get("/login", (req, res) => {
//     res.send("login endpoint")
// })

// module.exports = router;