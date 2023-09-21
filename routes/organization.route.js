const express = require("express");
const validate = require("../middlewares/validate");
const jwtAuth = require("../middlewares/verify");
const { organizationController } = require("../controllers");
const { organizationValidation } = require("../validation");

const router = express.Router();

router.post (
    "/",
    validate(organizationValidation.createOrganization),
    // jwtAuth.verifyToken,
    organizationController.createOrganizationController
);

module.exports = router;