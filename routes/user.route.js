const express = require("express");
const { getUserById, getUserByEmail } = require("../controllers/user.controller");


const router = express.Router();

router.get("/:key", getUserById)


module.exports = router