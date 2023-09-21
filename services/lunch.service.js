const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

const getUserLunch = async ({ user_id }) => {
	const __userLunch = await dB.users.findOne({
		where: { id: user_id },
		attributes: ['lunch_credit_balance'],
	});
	return __userLunch;
};

module.exports = {
	getUserLunch,
};
