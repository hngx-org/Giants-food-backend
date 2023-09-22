const express = require("express");
const {userController} = require("../controllers");
const { verifyToken } = require("../middlewares/verify");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:key", verifyToken, auth(), userController.getUserByIdOrEmail)
router.get('organizations/:org_id', verifyToken, auth(), userController.getUsersByOrgId);

module.exports = router;