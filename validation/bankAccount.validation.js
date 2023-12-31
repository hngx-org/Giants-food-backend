const Joi = require('joi');

const setAccount = {
	body: Joi.object().keys({
		bank_name: Joi.string().required(),
		bank_number: Joi.string().required(),
		bank_code: Joi.string().required(),
	}),
};

module.exports = {
	setAccount,
};
