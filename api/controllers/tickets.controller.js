const Ticket = require("../models/ticket");
const TicketMsg = require("../models/ticket-msg");

// Create and Save a new Ticket
exports.create = async (req, res, next) => {
  const userId = req.header("user");

  const newTicket = new Ticket({
    subject: req.body.subject,
    user: userId,
  });

  try {
    const ticket = await newTicket.save();

    const newTicketMsg = new TicketMsg({
      message: req.body.message,
      ticket: ticket._id,
      user: userId,
    });

    const ticketMsg = await newTicketMsg.save();
    ticket.messages = ticket.messages.concat(ticketMsg._id);
    await ticket.save();

    return res.status(201).json({
      message: "Ticket successfully added!",
      ticket: ticket,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Creation failed!" });
  }
};

// Get All ticket for User
exports.findAll = async (req, res, next) => {
  const userId = req.header("user");

  try {
    const tickets = await Ticket.find({ user: userId }).populate("messages");
    return res.status(201).json({
      success: true,
      message: "Tickets",
      data: tickets,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "cant get tickets!",
    });
  }
};

// Get ticket for User
exports.findOne = async (req, res, next) => {
  const userId = req.header("user");
  const id = req.params.id;

  try {
    const ticket = await Ticket.findOne({ _id: id, user: userId }).populate(
      "messages"
    );
    return res.status(201).json({
      success: true,
      message: "Ticket",
      data: ticket,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "cant get tickets!",
    });
  }
};

// Update Ticket
exports.update = async (req, res, next) => {
    const userId = req.header("user");
  console.log(userId);
    try {
      const ticket = await Ticket.findOne({ _id: req.body.id, user: userId }).populate(
        "messages"
      );
  
      const newTicketMsg = new TicketMsg({
        message: req.body.message,
        ticket: ticket._id,
        user: userId,
      });
  
      const ticketMsg = await newTicketMsg.save();
      ticket.messages = ticket.messages.concat(ticketMsg._id);
      await ticket.save();
  
      return res.status(201).json({
        success: true,
        message: "New Ticket message successfully added!",
        data: ticketMsg,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Creation failed!" });
    }
  };
