const adminController = require("../controllers/admin.controller");

const express = require("express");
const router = express.Router();

router.get("/tickets", adminController.findAll);

// Retrieve a single Ticket with id
router.get("/tickets/:id", adminController.findOne);

// Update a Ticket with id
router.put("/tickets/:id", adminController.update);

module.exports = router;