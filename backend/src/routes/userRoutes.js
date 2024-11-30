const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authentication = require("../middleware/authentication");
const upload = require("../utils/multer");
const authorizeRoles = require("../middleware/authorization");
const ROLES = require("../constant/roles");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get(
  "/profile",
  authentication,
  authorizeRoles([ROLES.ADMIN, ROLES.HANDLER, ROLES.STUDENT]),
  userController.getProfile
);
router.put(
  "/profile",
  authentication,
  upload.single("photo"),
  userController.updateProfile
);
router.put(
  "/activate-user/:id",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  userController.activateUser
);

module.exports = router;
