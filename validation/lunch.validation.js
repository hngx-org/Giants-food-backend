const Joi = require('joi');

const createLunch = {
	body: Joi.object().keys({
		receiver_id: Joi.string().required(),
		note: Joi.string(),
		quantity: Joi.string().required().valid(1, 2, 3, 4),
	}),
};

module.exports = {
	createLunch,
};
