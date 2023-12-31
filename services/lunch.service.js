const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const { Op } = require("sequelize");


const createLunch = async (lunchBody) => {
	const lunch = await dB.lunches.create(lunchBody)
	if (!lunch) {
		throw new ApiError(httpStatus.BAD_GATEWAY, 'Somethings wrong, Check your input and try again');
	}
	const { lunch_credit_balance } = await userService.getUserById(lunchBody.receiver_id)

	await userService.updateUserById(lunchBody.receiver_id, { lunch_credit_balance: parseInt(lunch_credit_balance) + parseInt(lunch.quantity) })
	return lunch
}


/**
 * Fetches all lunches for a specific organization.
 * @param {number} organizationId - The ID of the organization.
 * @returns {Promise<Array>} - A promise that resolves to an array of lunches.
 * @throws {ApiError} - If the organization is not found or an error occurs.
 */
async function getLunchesForOrganization(organizationId) {
	// const organization = await dB.organizations.findOne({ where: { id: organizationId } });
	const lunches = await dB.lunches.findAll({ where: { org_id: organizationId } }); // Based on associative relationship between organisations and lunches

	if (!lunches) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found', true);
	}
	return lunches;

}


async function getSingleLunch(lunchId) {
	const lunch = await dB.lunches.findOne({ where: { id: lunchId } });

	return lunch;
}

const getUserLunch = async (user_id) => {
	const userLunch = await dB.lunches.findAll({
		where: {
			[Op.or]: [
				{ receiver_id: user_id },
				{ sender_id: user_id }
			]
		}
	});
	const populatedLunches = await Promise.all(userLunch.map(async (lunch) => {
		if (user_id == lunch.receiver_id) {
			const user = await userService.getUserById(lunch.sender_id)
			return {
				...lunch.dataValues,
				receiver: { id: lunch.receiver_id },
				sender: { id: lunch.sender_id, name: user?.first_name }
			}
		} else {
			const user = await userService.getUserById(lunch.receiver_id)
			return {
				...lunch.dataValues,
				sender: { id: lunch.sender_id },
				receiver: { id: lunch.receiver_id, name: user?.first_name }
			}
		}
	}))
	return populatedLunches;
};


module.exports = {
	createLunch,
	getLunchesForOrganization,
	getSingleLunch,
	getUserLunch,
};

