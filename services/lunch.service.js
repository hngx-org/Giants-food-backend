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
