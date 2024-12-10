const mongoose = require("mongoose");
const PRIORITIES = require("../constant/priorities");
const STATUES = require("../constant/statues");

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User  ID is required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    priority: {
      type: String,
      enum: [PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH],
      required: [true, "Priority is required"],
    },
    attachment: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: [
        STATUES.OPEN,
        STATUES.IN_PROGRESS,
        STATUES.RESOLVED,
        STATUES.UNRESOLVED,
      ],
      default: "OPEN",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
