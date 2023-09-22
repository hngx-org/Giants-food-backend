const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { verifyToken, verifyEmailToken } = require('../middlewares/verify');
const { organizationController } = require('../controllers');
const { organizationValidation } = require('../validation');

const router = express.Router();

router.post(
	'/',
	verifyToken,
	auth(),
	validate(organizationValidation.createOrganization),
	organizationController.createOrganization,
);
router.post(
	'/invite',
	verifyToken,
	auth(),
	validate(organizationValidation.inviteStaff),
	organizationController.inviteStaff,
);
router.post(
	'/accept-invite',
	verifyEmailToken,
	validate(organizationValidation.acceptInvite),
	organizationController.acceptInvite,
);

module.exports = router;
