const mongoose = require("mongoose");
const STATUES = require("../constant/statues");

const historySchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "Ticket  ID is required"],
    },
    status: {
      type: String,
      enum: [
        STATUES.OPEN,
        STATUES.ASSIGNED,
        STATUES.IN_PROGRESS,
        STATUES.RESOLVED,
        STATUES.UNRESOLVED,
        STATUES.REASSIGNED,
      ],
      required: [true, "Status is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
