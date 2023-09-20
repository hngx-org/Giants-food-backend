const Joi = require('joi');

const createOrganizationValidator = {
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
		invite_id: Joi.string().required(),
	}),
};

module.exports = {
	createOrganizationValidator,
	inviteStaff,
	acceptInvite,
};
