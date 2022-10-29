const { Router } = require("express");
const AuthorizationController = require("../controllers/authorizationController");

const router = Router();

router.get("/login", AuthorizationController.login);
router.get("/callback", AuthorizationController.callback);

module.exports = router;