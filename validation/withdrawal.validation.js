const Joi = require('joi');

const createWithdrawal = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		role: Joi.string().required().valid('user', 'admin'),
	}),
};

module.exports = {
	// createWithdrawal,
};
