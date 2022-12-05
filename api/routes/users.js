const usersController = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

// Create a new User
router.post("", usersController.create);

// Retrieve all users
// router.get("/users", usersController.findAll);

// // Retrieve a single User with id
// router.get("/users/:id", usersController.findOne);

// // Update a User with id
// router.put("/users/:id", usersController.update);

// // // Delete a User with id
// router.delete("/users/:id", usersController.delete);

module.exports = router;
