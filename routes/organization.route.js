const express = require('express');
const validate = require('../middlewares/validate');
const organizationValidation = require('../validation/organization.validation');
const organizationController = require('../controllers/organization.controller');
const auth = require('../middlewares/auth');
const { verifyToken, verifyEmailToken } = require('../middlewares/verify');

const router = express.Router();


router.post('/', verifyToken, auth(), validate(organizationValidation.createOrganization), organizationController.createOrganization);
router.post('/invite', verifyToken, auth(), validate(organizationValidation.inviteStaff), organizationController.inviteStaff);
// router.post('/accept-invite', verifyToken, auth(), validate(organizationValidation.acceptInvite), organizationController.inviteStaff);



module.exports = router;