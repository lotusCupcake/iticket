const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const authentication = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorization");
const ROLES = require("../constant/roles");

// Route untuk membuat assignment baru
// router.post("/", createAssignment);
router.post(
  "/",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  assignmentController.createAssignment
);
router.put(
  "/",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  assignmentController.assignHandlerByUser
);

// Route untuk penugasan handler oleh user (update status dan resolution)
// router.put("/assignments/handler", assignHandlerByUser);

// Route untuk memperbarui status assignment dan menambahkannya ke status history
// router.put("/assignments/status", updateAssignmentStatusHistory);

module.exports = router;
