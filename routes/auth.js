const { Router } = require("express");
const { registerController, loginController } = require("../controllers/auth");
const router = Router();

// login
router.post("/login", loginController);

// register
router.post("/register", registerController);

module.exports = router;
