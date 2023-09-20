const express = require("express");
const { getUserById, getUserByEmail, getUsersByOrgID } = require("../controllers/user.controller");
const router = express.Router();

router.get("/:id", getUserById)
router.get("/:org_id", userController.getUsersByOrgID);
router.get("/:email", getUserByEmail)

module.exports = router
