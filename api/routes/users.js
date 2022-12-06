const usersController = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

// Create a new User
router.post("", usersController.create);

module.exports = router;
