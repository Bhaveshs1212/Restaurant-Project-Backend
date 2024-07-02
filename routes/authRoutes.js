const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authcontrollers");

const router = express.Router();

// Register route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

module.exports = router;