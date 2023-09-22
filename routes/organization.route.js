const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { verifyToken, verifyEmailToken } = require('../middlewares/verify');
const { organizationController } = require('../controllers');
const { organizationValidation } = require('../validation');

const router = express.Router();

/**
 * @swagger
 * 	tags:
 * 		name: Organization
 * 		description: API endpoint to manage organization
 *
 */

/**
 * @swagger
 * /organization:
 *   post:
 *     summary: Create Organization
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 */

router.post(
	'/',
	verifyToken,
	auth(),
	validate(organizationValidation.createOrganization),
	organizationController.createOrganization,
);

/**
 * @swagger
 * /organization/invite:
 *   post:
 *     summary: Invite Staff
 *     tags: [OrganizationInvite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizationInvite'
 */

router.post(
	'/invite',
	verifyToken,
	auth(),
	validate(organizationValidation.inviteStaff),
	organizationController.inviteStaff,
);

/**
 * @swagger
 * /organization/accept-invite:
 *   post:
 *     summary: Accept invite
 *     tags: [OrganizationInvite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizationInvite'
 */

router.post(
	'/accept-invite',
	validate(organizationValidation.acceptInvite),
	organizationController.acceptInvite,
);

module.exports = router;
