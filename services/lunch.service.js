const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');


const giftLunch = async (lunchBody) => {
    const lunch = await dB.lunches.create(lunchBody)

    if(!lunch){
        throw new ApiError(httpStatus.BAD_GATEWAY, 'Somethings wrong, Check your input and try again');
    }
    return lunch
}

module.exports = { giftLunch }