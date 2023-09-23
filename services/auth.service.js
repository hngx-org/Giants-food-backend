const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const token = require('../services/token.service');
const userService = require('./user.service');

const login = async (body) => {
	const { email, password_hash } = body;
	const user = await dB.users.findOne({ where: { email } });
	if (!user || !(await userService.isPasswordMatch(password_hash, user))) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
	}
	const tokens = await token.generateAuthTokens(user);
	user.refresh_token = tokens.refresh.token;
	await user.save();
	return {
		user: {
			...user.dataValues,
			created_at: undefined,
			updated_at: undefined,
			password_hash: undefined,
			refresh_token: undefined,
		},
		tokens,
	};
};

const signup = async (body) => {
	const user = await userService.createUser(body);
	if (!user) {
		throw new ApiError(httpStatus.BAD_GATEWAY, 'User was not created');
	}
	await user.save();
	return {
		user: {
			...user.dataValues,
			created_at: undefined,
			updated_at: undefined,
			password_hash: undefined,
			refresh_token: undefined,
		},
		tokens,
	};
};

module.exports = {
	login,
	signup,
};
