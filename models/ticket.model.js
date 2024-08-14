const mongoose = require("mongoose");
const { TICKET_STATUS } = require("./../constant");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ticketPriority: {
    type: Number,
    required: true,
    default: 4,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: TICKET_STATUS.OPEN,
  },
  reporter: String,
  assignee: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Ticket = mongoose.model("ticket", ticketSchema);
module.exports = Ticket;
