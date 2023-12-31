//External Imports
const httpStatus = require('http-status');
const { organizationService } = require('../services');
const ApiError = require('../utils/ApiError');
const Asyncly = require('../utils/Asyncly');

//Create New Organization
const findOrganization = Asyncly(async (req, res) => {
	const organization = await organizationService.findOrganization(req.params.org_id);
	if (!organization) return res.status(httpStatus.NOT_FOUND).send(null);
	res.status(httpStatus.OK).json(organization);
});

//Create New Organization
const createOrganization = Asyncly(async (req, res) => {
	const organization = await organizationService.createOrganization(req.body, req.user)
	res.status(httpStatus.CREATED).json(organization);
});

const inviteStaff = Asyncly(async (req, res) => {
	const val = await organizationService.inviteStaff(req);
	res.status(httpStatus.CREATED).send({ message: "User invited succesfully" });
});

const acceptInvite = Asyncly(async (req, res) => {
	const inviteToken = req.body.token;

	if (!inviteToken) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invite token not found');
	}

	const staffOfOrganization =
		await organizationService.checkIsUserInOrg(inviteToken);

	if (staffOfOrganization.existingUser) {
		await staffOfOrganization.existingUser.update({
			org_id: staffOfOrganization.id,
		})
		return res.status(httpStatus.OK).json({
			isUser: true,
			message: 'user added successfully',
		});
	}

	return res.status(httpStatus.OK).json({
		isUser: false,
		message: 'user not found',
		org_id: staffOfOrganization.id
	});
});

module.exports = {
	findOrganization,
	createOrganization,
	inviteStaff,
	acceptInvite,
};
