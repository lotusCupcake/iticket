const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const authentication = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization");
const ROLES = require("../constant/roles");

router.post(
  "/",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  assignmentController.createAssignment
);
router.put(
  "/",
  authentication,
  authorizeRoles([ROLES.HANDLER]),
  assignmentController.updateAssignment
);

module.exports = router;
