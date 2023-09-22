<<<<<<< HEAD
const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('../services/user.service')


const createLunch = async (lunchBody) => {
    const lunch = await dB.lunches.create(lunchBody)
    if(!lunch){
        throw new ApiError(httpStatus.BAD_GATEWAY, 'Somethings wrong, Check your input and try again');
    }
    return lunch
}




const redeemNewLunch = async ({id, user}) => {
    const lunch = await dB.lunches.findOne({
        where: {
            id: id
        }
    })
    if(!lunch){
        throw new ApiError(httpStatus.BAD_GATEWAY, 'No lunch with that id!');
    }else if(lunch.redeemed > 0){
        throw new ApiError(httpStatus.BAD_GATEWAY, 'This lunch has been redeemed already!');
    }

    const reqUser = await getUserById(user.id)
    if(!reqUser){
        throw new ApiError(httpStatus.BAD_GATEWAY, 'No user with that lunch id!');
    }

    if(reqUser.id !== reqUser.id){
        throw new ApiError(httpStatus.BAD_GATEWAY, 'You cannot redeem another users lunch!');
    }
    const newLunchValue = parseInt(reqUser.launch_credit_balance) + parseInt(lunch.quantity)
    reqUser.launch_credit_balance = newLunchValue
    lunch.redeemed = 1
    await lunch.save()
    await reqUser.save()

    return newLunchValue
}

module.exports = { createLunch, redeemNewLunch }
=======
const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const { Op } = require("sequelize");


const createLunch = async (lunchBody) => {
    const lunch = await dB.lunches.create(lunchBody)
    if(!lunch){
        throw new ApiError(httpStatus.BAD_GATEWAY, 'Somethings wrong, Check your input and try again');
    }
    const {lunch_credit_balance} = await userService.getUserById(lunchBody.receiver_id)

    await userService.updateUserById(lunchBody.receiver_id, {lunch_credit_balance: parseInt(lunch_credit_balance) + parseInt(lunch.quantity)})
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
	const lunches = await dB.lunches.findAll({where: {org_id: organizationId}}); // Based on associative relationship between organisations and lunches

	if (!lunches) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found', true);
	}
	return lunches;
	
}


async function getSingleLunch(lunchId) {
	const lunch = await dB.lunches.findOne({ where: { id: lunchId } });
	
	return lunch;
}

const getUserLunch = async (user_id ) => {
	const userLunch = await dB.lunches.findAll({
		where: {
			[Op.or]: [
			  { receiver_id: user_id },
			  { sender_id: user_id }
			]
		  }
	});
	return userLunch;
};


module.exports = {
	createLunch,
	getLunchesForOrganization,
	getSingleLunch,
	getUserLunch,
};

>>>>>>> b0f6664b77d8eb3aa3fbb8055e8a95f71ebf21c4
