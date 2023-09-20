const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * @typedef {{id:number, name:string, lunch_price:number, currency:string}} Organization
 */
/**
 * Creates and returns an Organization
 * @param {{name:string, lunch_price:number, currency:string}} payload
 * @returns {Organization}
 */
const createOrganizationService = async (payload) => {
	try {
		const existingOrganization = await dB.organizations.findAll({
			where: {
				name: payload.name,
			},
		});

		if (existingOrganization.length)
			throw new ApiError(httpStatus.CONFLICT, 'Organization name aleady taken');

		const { dataValues } = await dB.organizations.create(payload);
		return dataValues;
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	createOrganizationService,
};
