const express = require("express");
const { getUserById, getUserByEmail, getUsersByOrgId } = require("../controllers/user.controller");


const router = express.Router();

router.get("/:id", getUserById);
router.get("/:email", getUserByEmail);
router.get('/users/:org_id', getUsersByOrgId);

module.exports = router