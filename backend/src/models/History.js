const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "Ticket  ID is required"],
    },
    status: {
      type: mongoose.Schema.Types.String,
      ref: "Ticket",
      required: [true, "Status is required"],
    },
    description: {
      type: mongoose.Schema.Types.String,
      ref: "Ticket",
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);

module.exports = History;