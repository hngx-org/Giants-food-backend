const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
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
const createOrganization = async (payload, userId) => {
	const existingOrganization = await dB.organizations.findAll({
		where: {
			name: payload.name,
		},
	});

	if (existingOrganization.length) {
		throw new ApiError(httpStatus.CONFLICT, 'Organization name aleady taken');
	}

	const organization = await dB.organizations.create(payload);
    if (!organization) {
        return ApiError(httpStatus.BAD_GATEWAY, 'Organization was not created')
    }
    
    await userService.makeAdmin(userId, organization.dataValues.id)

	return organization.dataValues;
};

const inviteStaff = async (req) => { 
    const organization = await getOrg(req.user.org_id)
    if(!organization || !(req.user.is_admin)) {
        return ApiError(httpStatus.BAD_REQUEST, 'Organization does not exist or you lack the necessary priviledges')
    }
    const token = await tokenService.generateInviteToken(req.user.org_id);
    await dB.organizationInvites.create({email: req.body.email, token: token.token})
    // return await emailService.sendInvite(req.body.email, token, organization.name) // When email configuration is done it will be available
}

const getOrg = async(id) => {
    return organization = await dB.organizations.findOne({id})
}

/**
 * Handles onboarding of a user to an organisation
 * @param {string} inviteToken - user inviatation token
 * @param {Object} userBody - user request body
 * @return {Promise<object>} - promise resolved when user is confirmed
 */
const handleOrganizationOnboarding = async (inviteToken, userBody) => {
	const { id, email} = await tokenService.verifyInviteToken(
        inviteToken,
        tokenService.tokenTypes.ORG_INVITE
      );

	const existingUser = await dB.users.findOne({
		where: {
			email: email,
			org_id: id,
		},
	});

	if (existingUser) {
		return { message: 'User already belong to an organization'}
	}

	const hashedPasword = await bcrypt.hash(
		userBody.password,
		10,
	);

	const newUser = await dB.users.create({
		first_name: userBody.first_name,
		last_name: userBody.last_name,
		email: userBody.email,
		phone_number: userBody.phone_number,
		password_hash: hashedPasword,
	});

	return {
		message: 'User successfully added to the organisation',
		user: newUser,
	};
};

module.exports = { 
    createOrganization,
    inviteStaff,
    handleOrganizationOnboarding,
};
