const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/auth');
const { decodeInviteTokenPayload } = require('./token.service');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const handleOrganizationOnboarding = async (inviteToken, userBody) => {
	const decodedToken = decodeInviteTokenPayload(inviteToken);
	const { org_id, exp } = decodedToken;

	const currentTime = moment.unix;
	if (exp && currentTime > exp) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Token has expired');
	}
	const existingUser = await dB.users.findOne({
		where: {
			email: userBody.email,
			org_id: org_id,
		},
	});

	if (existingUser) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'User already belongs to the organisation',
		);
	}

	const hashedPasword = await bcrypt.hash(
		userBody.password,
		config.bcrypt.salt,
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
	handleOrganizationOnboarding,
};
