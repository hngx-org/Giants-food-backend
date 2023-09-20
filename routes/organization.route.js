const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { createOrganizationValidator } = require("../validation/organization.validation");
const { organizationController } = require("../controllers");


router.post (
    "/",
    validate(createOrganizationValidator.body),
    organizationController.createOrganizationController,

);


