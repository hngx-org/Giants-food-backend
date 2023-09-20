const express = require("express");
const userController = require("../controllers/user.controller")
const router = express.Router();

router.get("/:org_id", userController.getUsersByOrgID);


module.exports = {
  router,
}

