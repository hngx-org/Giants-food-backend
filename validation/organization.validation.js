const Joi = require('joi');

const setAccount = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password),
		name: Joi.string().required(),
		role: Joi.string().required().valid('user', 'admin'),
	}),
};



module.exports = {
	setAccount,
};
