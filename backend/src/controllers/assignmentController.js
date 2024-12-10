const Assignment = require("../models/Assignment");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const History = require("../models/History");
const ResponseAPI = require("../utils/response");
const STATUES = require("../constant/statues");

const assignmentController = {
  async createAssignment(req, res, next) {
    try {
      const { userId, ticketId } = req.body;

      const user = await User.findById(userId);
      const ticket = await Ticket.findById(ticketId);

      if (!user || !ticket) {
        return ResponseAPI.notFound(res, "User or Ticket not found");
      }

      const assignment = new Assignment({
        userId,
        ticketId,
      });

      await assignment.save();

      await History.create({
        ticketId: ticket._id,
        status: STATUES.ASSIGNED,
        description: "Ticket Assigned",
      });

      return ResponseAPI.success(
        res,
        assignment,
        "Assignment created successfully"
      );
    } catch (error) {
      console.error("Error creating assignment:", error);
      return next(error);
    }
  },

  async updateAssignment(req, res, next) {
    try {
      const resolution = req.body.resolution;

      const assignment = await Assignment.findById(req.params.id);

      if (!assignment) {
        return ResponseAPI.notFound(res, "Assignment not found");
      }

      assignment.resolution = resolution;
      await assignment.save();

      return ResponseAPI.success(
        res,
        assignment,
        "Assignment updated successfully"
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = assignmentController;
