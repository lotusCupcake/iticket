const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "Ticket ID is required"],
    },
    status: {
      type: mongoose.Schema.Types.String,
      ref: "Ticket",
      required: [true, "Status is required"],
    },
    resolution: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
