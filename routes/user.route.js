const express = require("express");
const userController  = require("../controllers/user.controller");
const {verifyToken} = require("../middlewares/verify");
const auth = require("../middlewares/auth");

const router = express.Router();

// router.get("/:id", getUserById)
router.get("/:org_id", verifyToken, auth(), userController.getUsersByOrgID);
// router.get("/:email", getUserByEmail)

module.exports = router
