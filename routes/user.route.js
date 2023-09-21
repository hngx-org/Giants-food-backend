const express = require("express");
const { getUserByIdOrEmail, getUsersByOrgId  } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verify");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:key", verifyToken, auth(), getUserByIdOrEmail)
router.get('/users/:org_id', getUsersByOrgId);

module.exports = router