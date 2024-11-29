const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authentication = require("../middleware/authentication");
const upload = require("../utils/multer");
const authorizeRoles = require("../middleware/authorization");
const ROLES = require("../constant/roles");

router.post(
  "/",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  categoryController.createCategory
);

router.get("/", categoryController.getCategories);

router.put(
  "/:id",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authentication,
  authorizeRoles([ROLES.ADMIN]),
  categoryController.deleteCategory
);

module.exports = router;
