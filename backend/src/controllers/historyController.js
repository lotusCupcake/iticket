const History = require("../models/History");
const ResponseAPI = require("../utils/response");

const historyController = {
  async getHistoryTickets(req, res, next) {
    try {
      const { ticketId } = req.body;
      if (!ticketId) {
        return ResponseAPI.error(res, "Ticket ID is required");
      }
      const history = await History.find({ ticketId });
      if (!history.length) {
        return ResponseAPI.notFound(res, "No history found for this ticket");
      }
      return ResponseAPI.success(
        res,
        history,
        "Successfully retrieved ticket histories"
      );
    } catch (error) {
      console.error("Error fetching ticket history:", error);
      return next(error);
    }
  },
};

module.exports = historyController;
