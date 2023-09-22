const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');


const createLunch = async (lunchBody) => {
    const lunch = await dB.lunches.create(lunchBody)
    if(!lunch){
        return new ApiError(httpStatus.BAD_GATEWAY, 'Somethings wrong, Check your input and try again');
    }
    const {lunch_credit_balance} = await userService.getUserById(lunchBody.receiver_id)

    await userService.updateUserById(lunchBody.receiver_id, {lunch_credit_balance: parseInt(lunch_credit_balance) + parseInt(lunch.quantity)})
    return lunch
}

module.exports = { createLunch }
const Organization = dB.organizations;

const Lunch = dB.lunches;

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


async function getSingleLunch(lunchId) {
	try {
		const lunch = await Lunch.findOne({ where: { id: lunchId } });
		if (!lunch) {
			return {
				"message": "Lunch cannot be found",
				"statusCode": httpStatus.NOT_FOUND,
				"data": { }
			  }
		}
		return {
				"message": "Lunch fetched Successfully",
				"statusCode": httpStatus.OK,
				"data": lunch
				}

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
	getSingleLunch
};
