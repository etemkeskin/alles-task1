const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticket = mongoose.Schema(
  {
    subject: String,
    status: {
      type: String,
      enum: ['open','inprogress','closed'],
      default: 'open',
      required: true
      },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    messages: [{
      type: Schema.Types.ObjectId,
      ref: "TicketMsg"
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Ticket', ticket);



