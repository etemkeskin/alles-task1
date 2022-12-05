const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketMsg =mongoose.Schema(
    {
      message: String,
        ticket: {
          type: Schema.Types.ObjectId,
          ref: "Ticket"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
          }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('TicketMsg', ticketMsg);
