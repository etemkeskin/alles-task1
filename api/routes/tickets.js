const ticketsController = require("../controllers/tickets.controller");
const express = require("express");
const router = express.Router();

// Create a new Ticket
router.post("", ticketsController.create);
router.get("", ticketsController.findAll);

// Retrieve a single Ticket with id
router.get("/:id", ticketsController.findOne);

// Update a Ticket with id
router.put("/:id", ticketsController.update);

module.exports = router;

// Retrieve all tickets
// router.get("/users", usersController.findAll)
