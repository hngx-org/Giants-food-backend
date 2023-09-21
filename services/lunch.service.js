const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const Lunch = dB.lunches;

/**
 * Fetches all lunches for a specific organization.
 * @param {number} organizationId - The ID of the organization.
 * @returns {Promise<Array>} - A promise that resolves to an array of lunches.
 * @throws {ApiError} - If the organization is not found or an error occurs.
 */
async function getLunchesForOrganization(organizationId) {
	const lunches = await Lunch.findAll({ where: { org_id: organizationId } });
	if (lunches.length === 0) {
		return null;
	} else {
		return lunches;
	}
}

async function getSingleLunch(lunchId) {
	try {
		const lunch = await Lunch.findOne({ where: { id: lunchId } });
		return lunch;
	} catch (error) {
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Failed to fetch lunches for the specified id',
			true,
		);
	}
}

module.exports = {
	getLunchesForOrganization,
	getSingleLunch,
};
