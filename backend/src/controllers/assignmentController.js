const Assignment = require("../models/Assignment");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const History = require("../models/History");
const ResponseAPI = require("../utils/response");

const assignmentController = {
  async createAssignment(req, res) {
    try {
      const { userId, ticketId, resolution } = req.body;

      const user = await User.findById(userId);
      const ticket = await Ticket.findById(ticketId);
      if (!user || !ticket) {
        return ResponseAPI.notFound(res, "User  or Ticket not found");
      }

      const assignment = new Assignment({
        userId,
        ticketId,
        status: ticket.status,
        resolution,
      });

      await assignment.save();
      return res
        .status(201)
        .json({ message: "Assignment created successfully", assignment });
    } catch (error) {
      console.error("Error creating assignment:", error);
      return res.status(500).json({ message: error.message });
    }
  },

  async updateAssignment(req, res) {
    try {
      const { assignmentId, status, resolution } = req.body;
      console.log("Incoming request data:", {
        assignmentId,
        status,
        resolution,
      });
      if (!assignmentId) {
        return res.status(400).json({ message: "Assignment ID is required" });
      }
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }

      const ticket = await Ticket.findById(assignment.ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      console.log("Before Update - Ticket Status:", ticket.status);
      console.log("Before Update - Assignment Status:", assignment.status);
      if (status) {
        const allowedStatuses = [
          "OPEN",
          "IN_PROGRESS",
          "RESOLVED",
          "UNRESOLVED",
        ];
        if (!allowedStatuses.includes(status)) {
          return res.status(400).json({
            message: `Invalid status value. Allowed values are: ${allowedStatuses.join(
              ", "
            )}`,
          });
        }

        ticket.set({ status });
        ticket.markModified("status");
        assignment.status = status;
      }

      if (resolution) {
        assignment.resolution = resolution;
      }

      console.log("Before saving - Ticket Status:", ticket.status);
      console.log("Before saving - Assignment Status:", assignment.status);

      const [updatedTicket, updatedAssignment] = await Promise.all([
        ticket.save(),
        assignment.save(),
      ]);

      console.log("After saving - Ticket Status:", updatedTicket.status);
      console.log(
        "After saving - Assignment Status:",
        updatedAssignment.status
      );
      await History.create({
        userId: req.user._id,
        ticketId: ticket._id,
        status: assignment.status,
        description: assignment.resolution,
      });
      return res.status(200).json({
        message: "Assignment and ticket updated successfully",
        assignment: updatedAssignment,
      });
    } catch (error) {
      console.error("Error updating assignment:", error);
      return res
        .status(500)
        .json({ message: "Error saving updates", error: error.message });
    }
  },
};

module.exports = assignmentController;
