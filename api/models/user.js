const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = mongoose.Schema(
  {
    name: String,
    surname: String,
    password: String,
    role: {
      type: String,
      enum: ['customer','admin'],
      default: 'customer',
      required: true
      },
    tickets: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', user);

