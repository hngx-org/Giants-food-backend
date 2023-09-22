const Joi = require('joi');

const createWithdrawal = {
	body: Joi.object().keys({
		bank_name: Joi.string().required(),
		bank_code: Joi.string(),
		bank_number: Joi.string().required(),
		amount: Joi.string()
	}),
};

module.exports = {
	createWithdrawal,
};
