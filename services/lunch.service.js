const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const Organization = dB.organizations;


/**
 * Fetches all lunches for a specific organization.
 * @param {number} organizationId - The ID of the organization.
 * @returns {Promise<Array>} - A promise that resolves to an array of lunches.
 * @throws {ApiError} - If the organization is not found or an error occurs.
 */
async function getLunchesForOrganization(organizationId) {
	const organization = await Organization.findByPk(organizationId);

	if (!organization) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found', true);
	} else {
		const lunches = await organization.getLunches(); // Based on associative relationship between organisations and lunches
		return lunches;
	}
}



module.exports = {
	getLunchesForOrganization,
};
