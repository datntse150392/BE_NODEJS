const controller = require("../controllers");
const express = require("express");

const router = express.Router();
router.post("/register", controller.register);

module.exports = router;
