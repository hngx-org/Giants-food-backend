const express = require("express");
const { getUserById, getUserByEmail } = require("../controllers/user.controller");


const router = express.Router();

router.get("/:id", getUserById)
router.get("/:email", getUserByEmail)

module.exports = router