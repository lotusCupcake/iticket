const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const authentication = require("../middleware/authentication");
const upload = require("../utils/multer");
const authorizeRoles = require("../middleware/authorization");
const ROLES = require("../constant/roles");

// router.post(
//   "/",
//   authentication,
//   authorizeRoles([ROLES.STUDENT]),
//   historyController.createTicket
// );

router.get("/:id", authentication, historyController.getHistoryTickets);

// router.get(
//   "/all",
//   authentication,
//   authorizeRoles([ROLES.ADMIN, ROLES.HANDLER]),
//   historyController.getAllTickets
// );

// router.put(
//   "/:id",
//   authentication,
//   authorizeRoles([ROLES.ADMIN]),
//   historyController.updateTicketStatus
// );

// router.delete(
//   "/:id",
//   authentication,
//   authorizeRoles([ROLES.STUDENT]),
//   historyController.deleteTicket
// );

module.exports = router;
