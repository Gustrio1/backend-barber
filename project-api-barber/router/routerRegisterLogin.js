const express = require("express");
const register = require("../controller/registerUserBarber");
const router = express.Router();

router.post("/register", register.registerUserBarber);
router.post("/login", register.login);

module.exports = router;
