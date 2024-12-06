const Ticket = require("../models/Ticket");
const History = require("../models/History");
const Assignment = require("../models/Assignment");
const ResponseAPI = require("../utils/response");
const fs = require("fs");
const env = require("../config/env");
const FormData = require("form-data");
const { imageUpload } = require("../utils/imageUtil");

const ticketController = {
  async createTicket(req, res, next) {
    try {
      const ticket = await Ticket.create({
        ...req.body,
        userId: req.user._id,
      });
      if (req.file) {
        const urlUploadResult = await imageUpload(req.file, ticket.attachment);
        ticket.attachment = urlUploadResult;
        await ticket.save();
      }
      await History.create({
        userId: req.user._id,
        ticketId: ticket._id,
        status: ticket.status,
        description: "Ticket Created",
      });

      return ResponseAPI.success(
        res,
        ticket,
        "Ticket created successfully",
        201
      );
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Error creating ticket:", error);
      return next(error);
    }
  },

  async getUserTickets(req, res, next) {
    try {
      const tickets = await Ticket.find({ userId: req.user._id })
        .populate("userId", "name")
        .populate("categoryId", "name");

      return ResponseAPI.success(res, tickets);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
      return next(error);
    }
  },

  async getTicketsHandler(req, res, next) {
    try {
      const { ticketId } = req.body;
      const tickets = await Assignment.find({ ticketId }).populate(
        "userId",
        "name"
      );

      return ResponseAPI.success(res, tickets);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
      return next(error);
    }
  },

  async getAllTickets(req, res, next) {
    try {
      const filter = {};

      if (req.query.status) {
        filter.status = req.query.status;
      }
      const tickets = await Ticket.find(filter)
        .populate("userId", "name")
        .populate("categoryId", "name");

      return ResponseAPI.success(res, tickets);
    } catch (error) {
      console.error("Error fetching all tickets:", error);
      return next(error);
    }
  },

  async updateTicketStatus(req, res, next) {
    try {
      const { _id } = req.user;

      if (!_id) {
        return ResponseAPI.unauthorized(res, "User  not authenticated");
      }

      const ticket = await Ticket.findOne({ _id: req.params.id, userId: _id });

      if (!ticket) {
        return ResponseAPI.notFound(res, "Ticket not found");
      }

      ticket.isDone = true;
      await ticket.save();

      return ResponseAPI.success(res, ticket);
    } catch (error) {
      return next(error);
    }
  },

  async deleteTicket(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return ResponseAPI.error(res, "ID not provided!", 400);
      }

      const ticket = await Ticket.findByIdAndDelete(id);

      if (!ticket) {
        return ResponseAPI.notFound(res, "Ticket not found");
      }

      return ResponseAPI.success(res, null, "Ticket deleted successfully");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      return next(error);
    }
  },
};

module.exports = ticketController;
