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

router.get(
  "/",
  authentication,
  authorizeRoles([ROLES.ADMIN, ROLES.HANDLER, ROLES.STUDENT]),
  ticketController.getTickets
);

router.put(
  "/:id",
  authentication,
  authorizeRoles([ROLES.ADMIN, ROLES.HANDLER, ROLES.STUDENT]),
  upload.single("attachment"),
  ticketController.updateTicket
);

router.delete(
  "/:id",
  authentication,
  authorizeRoles([ROLES.ADMIN, ROLES.STUDENT]),
  ticketController.deleteTicket
);

module.exports = router;
