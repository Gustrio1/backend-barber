const express = require("express");
const registerLoginPelanggan = require("../controller/registerUserPelanggan");

const router = express.Router();

router.post(
  "/register/pelanggan",
  registerLoginPelanggan.registerUserPelanggan
);
router.post("/login/pelanggan", registerLoginPelanggan.loginPelanggan);

module.exports = router;
