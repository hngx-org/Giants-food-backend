const express = require('express');
const { getUserByIdOrEmail } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verify");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:key", verifyToken, auth(), getUserByIdOrEmail)

module.exports = router;
