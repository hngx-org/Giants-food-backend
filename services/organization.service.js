const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const authService = require('./auth.service');
const emailService = require('./email.service');
const tokenService = require('./token.service');
const bcrypt = require('bcryptjs');

/**
 * @typedef {{id:number, name:string, lunch_price:number, currency:string}} Organization
 */
/**
 * Creates and returns an Organization
 * @param {{name:string, lunch_price:number, currency:string}} payload
 * @returns {Promise<Organization>}
 */
const createOrganization = async (body, user) => {
	const organization = await dB.organizations.create(body)

	if (!organization) {
		throw new ApiError(httpStatus.BAD_GATEWAY, 'Organization was not created');
	}

	await userService.makeAdmin(user, organization.id)

	return organization.dataValues;
};

const inviteStaff = async (req) => {
	const organization = await getOrg(req.user.org_id);
	if (!organization || !req.user.is_admin) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Organization does not exist or you lack the necessary priviledges',
		);
	}
	const token = await tokenService.generateInviteToken(
		req.user.org_id,
		req.body.email,
	);
	await dB.organizationInvites.create({
		email: req.body.email,
		token: token.token,
	});
	// return {token: token.token}
	return await emailService.sendInvite(
		req.body.email,
		token,
		organization.name,
	); // When email configuration is done it will be available
};

const getOrg = async (id) => {
	return organization = await dB.organizations.findOne({ where: { id } });
};

/**
 * Handles onboarding of a user to an organisation
 * @param {string} inviteToken - user inviatation token
 * @param {Object} userBody - user request body
 * @return {Promise<object>} - promise resolved when user is confirmed
 */
const handleOrganizationOnboarding = async (userBody) => {
	const newUser = await authService.signup(userBody);
	return {
		message: 'User successfully added to the organisation',
		user: newUser,
	};
};

const checkIsUserInOrg = async (inviteToken) => {
	const { id, email } = await tokenService.verifyInviteToken(inviteToken);
	const existingUser = await dB.users.findOne({
		where: {
			email: email,
			org_id: id,
		},
	});

	return { existingUser, email, id };
};

module.exports = {
	createOrganization,
	inviteStaff,
	handleOrganizationOnboarding,
	checkIsUserInOrg,
};
