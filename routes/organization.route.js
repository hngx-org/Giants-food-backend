const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { verifyToken, verifyEmailToken } = require('../middlewares/verify');
const { organizationController, userController } = require('../controllers');
const { organizationValidation } = require('../validation');

const router = express.Router();

router.get('/:org_id', verifyToken, auth(), organizationController.findOrganization);
router.get('/:org_id/users', verifyToken, auth(), userController.getUsersByOrgId);

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
	validate(organizationValidation.acceptInvite),
	organizationController.acceptInvite,
);

module.exports = router;
