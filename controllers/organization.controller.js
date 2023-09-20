const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const ApiError = require('../utils/ApiError');
const { authService } = require('../services');

const acceptInvite = Asyncly(async (req, res) => {
	try {
		const inviteToken = req.query.inviteToken;

		if (!inviteToken) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Invite token not found');
		}
		const { first_name, last_name, email, phone_number, password_hash } =
			req.body;

		if (
			!first_name ||
			!last_name ||
			!email ||
			!phone_number ||
			!password_hash
		) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid details');
		}

		const userBody = {
			first_name,
			last_name,
			email,
			phone_number,
			password_hash,
		};

		const data = organizationService.handleOrganizationOnboarding(
			inviteToken,
			userBody,
		);

		if (!data) {
			throw new ApiError(httpStatus.NOT_FOUND, 'not found');
		}

		res.status(httpStatus.CREATED).json({
			status: true,
			message: data.message,
			user: data.user,
		});
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
});

module.exports = { acceptInvite };
