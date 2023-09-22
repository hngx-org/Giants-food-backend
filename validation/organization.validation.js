const Joi = require('joi');

const createOrganization = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		lunch_price: Joi.string().required(),
	}),
};

const inviteStaff = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
	}),
};

const acceptInvite = {
	body: Joi.object().keys({
		first_name: Joi.string(),
		last_name: Joi.string(),
		phone_number: Joi.string(),
		email: Joi.string(),
		password_hash: Joi.string(),
	}),
};

module.exports = {
	createOrganization,
	inviteStaff,
	acceptInvite,
};
