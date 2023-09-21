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