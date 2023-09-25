const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password_hash: Joi.string().required().custom(password),
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		phone: Joi.string(),
		profile_pic: Joi.string(),
		org_id: Joi.string()
	}),
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password_hash: Joi.string().required(),
	}),
};

const logout = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

const refreshTokens = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

const forgotPassword = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
	}),
};

const resetPassword = {
	body: Joi.object().keys({
		token: Joi.string().required(),
		password_hash: Joi.string().required().custom(password),
	}),
};

const verifyEmail = {
	body: Joi.object().keys({
		token: Joi.string().required(),
	}),
};

module.exports = {
	register,
	login,
	logout,
	refreshTokens,
	forgotPassword,
	resetPassword,
	verifyEmail,
};
