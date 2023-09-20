const express = require("express");
const { updateUser, getUserById, getUserByEmail } = require("../controllers/user.controller");


const router = express.Router();
router.put("/:id", updateUser)
router.get("/:id", getUserById)
router.get("/:email", getUserByEmail)

module.exports = router