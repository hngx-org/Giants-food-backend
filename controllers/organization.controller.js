//External Imports
const httpStatus = require('http-status');
const { organizationService } = require('../services');
const ApiError = require('../utils/ApiError');
const Asyncly = require('../utils/Asyncly');

//Create New Organization
const createOrganization = Asyncly(async (req, res) => {
    const organization = await organizationService.createOrganization(req.body, req.user)
    res.status(httpStatus.CREATED).json({
		message: 'success',
		data: organization,
	});
});

const inviteStaff = Asyncly(async (req, res) => {
	// await organizationService.inviteStaff(req)
	const val = await organizationService.inviteStaff(req);
	res.status(httpStatus.OK).json(val);
	// res.status(httpStatus.OK).send({ message: "User invited succesfully" });
});

const acceptInvite = Asyncly(async (req, res) => {
	const inviteToken = req.query.token;

	if (!inviteToken) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invite token not found');
	}

	const staffOfOrganization =
		await organizationService.checkIsUserInOrg(inviteToken);

	if (staffOfOrganization.existingUser !== null) {
		return res.status(httpStatus.OK).json({
			status: true,
			message: 'user already exists in this organization',
		});
	}

	const { first_name, last_name, phone_number, password_hash } = req.body;

	if (!first_name || !last_name || !phone_number || !password_hash) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid details');
	}

	const userBody = {
		first_name,
		last_name,
		phone_number,
		password_hash: password_hash,
	};

	const val = await organizationService.handleOrganizationOnboarding(
		userBody,
		staffOfOrganization.email,
		staffOfOrganization.id,
	);

	res.status(httpStatus.CREATED).json({
		status: true,
		message: val.message,
		user: val.user,
	});
});

module.exports = {
	createOrganization,
	inviteStaff,
	acceptInvite,
};
