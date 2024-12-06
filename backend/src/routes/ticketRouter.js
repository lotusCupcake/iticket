const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const authentication = require("../middleware/authentication");
const upload = require("../utils/multer");
const authorizeRoles = require("../middleware/authorization");
const ROLES = require("../constant/roles");

router.post(
  "/",
  authentication,
  authorizeRoles([ROLES.STUDENT]),
  upload.single("attachment"),
  ticketController.createTicket
);

router.get("/user", authentication, ticketController.getUserTickets);

router.get(
  "/",
  authentication,
  authorizeRoles([ROLES.ADMIN, ROLES.HANDLER]),
  ticketController.getAllTickets
);
router.get("/handler", authentication, ticketController.getTicketsHandler);

router.put(
  "/:id",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  ticketController.updateTicketStatus
);

router.delete(
  "/:id",
  authentication,
  authorizeRoles([ROLES.STUDENT]),
  ticketController.deleteTicket
);

module.exports = router;
