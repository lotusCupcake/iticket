const Assignment = require("../models/Assignment");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const ResponseAPI = require("../utils/response");

// Create a new assignment
const assignmentController = {
  async createAssignment(req, res) {
    try {
      const { userId, ticketId, status, resolution } = req.body;

      // Cek jika user dan ticket ada
      const user = await User.findById(userId);
      const ticket = await Ticket.findById(ticketId);
      if (!user || !ticket) {
        return ResponseAPI.notFound(res, "User or Ticket not found");
      }

      // Buat assignment baru
      const assignment = new Assignment({
        userId,
        ticketId,
        status: ticket.status,
        resolution,
      });

      await assignment.save();
      return res.status(201).json(assignment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Assign handler by user (update status and resolution)
  //   async assignHandlerByUser(req, res) {
  //     try {
  //       const { ticketId, status, resolution } = req.body;

  //       // Cek apakah assignment ada
  //       const assignment = await Assignment.findById(ticketId);
  //       const ticket = await Ticket.findById(ticketId);
  //       if (!assignment) {
  //         return res.status(404).json({ message: "Assignment not found" });
  //       }

  //       // Update status dan resolution assignment
  //       ticket.status = status || ticket.status;
  //       assignment.resolution = resolution || assignment.resolution;

  //       // Simpan perubahan
  //       await assignment.save();

  //       return res.status(200).json(assignment);
  //     } catch (error) {
  //       return res.status(500).json({ message: error.message });
  //     }
  //   },
  async assignHandlerByUser(req, res) {
    try {
      const { assignmentId, status, resolution } = req.body;
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      const ticket = await Ticket.findById(assignment.ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      if (resolution) {
        assignment.resolution = resolution;
      }
      if (status && status !== ticket.status) {
        ticket.status = status;
      }
      await assignment.save();
      await ticket.save();

      return res.status(200).json(assignment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = assignmentController;
