const express = require("express");
const { getUserByIdOrEmail } = require("../controllers/user.controller");


const router = express.Router();

router.get("/:key", getUserByIdOrEmail)


module.exports = router