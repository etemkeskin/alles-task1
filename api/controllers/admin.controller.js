const Ticket = require("../models/ticket");
const TicketMsg = require("../models/ticket-msg");

exports.findAll = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate("user");
    return res.status(200).json({
      success: true,
      message: "Tickets555",
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
  const id = req.params.id;

  try {
    const ticket = await Ticket.findOne({ _id: id }).populate("messages").populate("user");
    return res.status(201).json({
      success: true,
      message: "Ticket",
      data: ticket,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "cant get ticket!",
    });
  }
};

// Update Ticket
exports.update = async (req, res, next) => {
  const userId = req.header("user");
  console.log(userId);
  try {
    const ticket = await Ticket.findOne({ _id: req.body.id }).populate(
      "messages"
    );

    ticket.status = "inprogress";
    const result = await ticket.save();

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
