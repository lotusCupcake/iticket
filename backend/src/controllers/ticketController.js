const Ticket = require("../models/Ticket");
const History = require("../models/History");
const Assignment = require("../models/Assignment");
const ResponseAPI = require("../utils/response");
const fs = require("fs");
const { imageUpload } = require("../utils/imageUtil");
const { console } = require("inspector");
const ROLES = require("../constant/roles");
const STATUES = require("../constant/statues");
const PRIORITIES = require("../constant/priorities");

const ticketController = {
  async createTicket(req, res, next) {
    try {
      const ticket = await Ticket.create({
        ...req.body,
        userId: req.user._id,
      });

      if (req.file) {
        const urlUploadResult = await imageUpload(req.file);
        ticket.attachment = urlUploadResult;
      }

      await ticket.save();

      await History.create({
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

  async getTickets(req, res, next) {
    try {
      const filter = {};

      if (req.query.status) {
        filter.status = req.query.status;
      }

      const matchConditions = [];

      if (req.user.role === ROLES.STUDENT) {
        matchConditions.push({ userId: req.user._id });
      }

      if (req.user.role === ROLES.HANDLER) {
        matchConditions.push({ "assignments.user._id": req.user._id });
      }

      const tickets = await Ticket.aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "assignments",
            localField: "_id",
            foreignField: "ticketId",
            as: "assignments",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "histories",
            localField: "_id",
            foreignField: "ticketId",
            as: "histories",
          },
        },
        {
          $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "users",
            localField: "assignments.userId",
            foreignField: "_id",
            as: "assignmentUsers",
          },
        },
        {
          $addFields: {
            assignments: {
              $arrayElemAt: [
                {
                  $map: {
                    input: "$assignments",
                    as: "assignment",
                    in: {
                      _id: "$$assignment._id",
                      resolution: "$$assignment.resolution",
                      user: {
                        $arrayElemAt: [
                          {
                            $map: {
                              input: {
                                $filter: {
                                  input: "$assignmentUsers",
                                  as: "user",
                                  cond: {
                                    $eq: ["$$user._id", "$$assignment.userId"],
                                  },
                                },
                              },
                              as: "user",
                              in: {
                                _id: "$$user._id",
                                name: "$$user.name",
                                email: "$$user.email",
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                  },
                },
                0,
              ],
            },

            statusIndex: { $indexOfArray: [Object.values(STATUES), "$status"] },
            priorityIndex: {
              $indexOfArray: [Object.values(PRIORITIES), "$priority"],
            },
          },
        },

        ...(matchConditions.length > 0
          ? [{ $match: { $and: matchConditions } }]
          : []),

        {
          $sort: {
            statusIndex: 1,
            priorityIndex: -1,
            createdAt: -1,
          },
        },

        {
          $project: {
            _id: 1,
            "user._id": 1,
            "user.name": 1,
            "user.email": 1,
            description: 1,
            status: 1,
            priority: 1,
            attachment: 1,
            "category._id": 1,
            "category.name": 1,
            assignments: 1,
            histories: 1,
          },
        },
      ]);

      return ResponseAPI.success(res, tickets);
    } catch (error) {
      console.error("Error fetching all tickets:", error);
      return next(error);
    }
  },
  async updateTicket(req, res, next) {
    try {
      if (req.user.role === ROLES.STUDENT) {
        const assignment = await Assignment.find({
          ticketId: req.params.id,
        });
        if (assignment.length > 0) {
          return ResponseAPI.error(
            res,
            "You can't update a ticket that has been assigned to handler",
            403
          );
        }
      }

      const { categoryId, description, priority, status } = req.body;

      const ticket = await Ticket.findById(req.params.id);

      if (req.file) {
        const urlUploadResult = await imageUpload(req.file, ticket.attachment);

        ticket.attachment = urlUploadResult;
      }

      if (categoryId) {
        ticket.categoryId = categoryId;
      }

      if (description) {
        ticket.description = description;
      }

      if (priority) {
        ticket.priority = priority;
      }

      if (status) {
        ticket.status = status;
        const history = new History({
          ticketId: ticket._id,
          status: ticket.status,
          description: "Ticket updated, status changed to " + ticket.status,
        });
        await history.save();
      }

      await ticket.save();

      ResponseAPI.success(res, ticket, "Ticket updated successfully");
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Error updating ticket: ", error);
      return next(error);
    }
  },

  async deleteTicket(req, res, next) {
    try {
      const assignment = await Assignment.find({
        ticketId: req.params.id,
      });

      if (req.user.role === ROLES.STUDENT) {
        if (assignment.length > 0) {
          return ResponseAPI.error(
            res,
            "You can't update a ticket that has been assigned to handler",
            403
          );
        }
      }

      const id = req.params.id;

      if (!id) {
        return ResponseAPI.error(res, "ID not provided!", 400);
      }

      try {
        await Ticket.findByIdAndDelete(id);
        await History.deleteMany({ ticketId: id });
        if (assignment.length > 0) {
          await Assignment.deleteMany({ ticketId: id });
        }
      } catch (error) {
        console.error("Error deleting ticket: ", error);
        return next(error);
      }
      return ResponseAPI.success(res, null, "Ticket deleted successfully");
    } catch (error) {
      console.error("Error deleting ticket: ", error);
      return next(error);
    }
  },
};

module.exports = ticketController;
