const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const authentication = require("../middleware/authentication");
const upload = require("../utils/multer");
const authorizeRoles = require("../middleware/authorization");
const ROLES = require("../constant/roles");

router.get("/", authentication, historyController.getHistoryTickets);

module.exports = router;
