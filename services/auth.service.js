const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const token = require('../services/token.service');
const userService = require('./user.service');
const bcrypt = require('bcryptjs');
const emailService = require('./email.service');

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
	const tokens = await token.generateAuthTokens(user);
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

const forgotPassword = async (body) => {
	const { email } = body;

	const resetToken = await token.generateResetPasswordToken(email);

	await emailService.sendResetPasswordEmail(email, resetToken);

	return {
		message: 'Password Reset Email Sent'
	}
}

const resetPassword = async (resetToken, body) => {
	const { password_hash } = body;
	userToReset = await token.verifyResetToken(resetToken); 
	if (!userToReset) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Token');
	}
	await userToReset.update({password_hash: bcrypt.hashSync(password_hash, 10)});

	return {
		message: 'Password Reset Successful'
	}
	
}

module.exports = {
	login,
	signup,
	forgotPassword,
	resetPassword
};
