const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
<<<<<<< HEAD
=======

const createWithdrawal = async (withdrawalBody) => {
    let {user_id, amount, org_id} = withdrawalBody;
    // const user = await dB.users.findOne({ where: { id: user_id } });
    // if (!user) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    // }
    const organization = await dB.organizations.findOne({ where: { id: org_id } });
    if (!organization) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User Organization not found');
    }
    amount = parseInt(amount) * parseInt(organization.lunch_price);

    const withdrawal = await dB.withdrawals.create({user_id, amount});
    return withdrawal;
}

const getWithdrawalsByUserId = async (user_id) => {
    const withdrawal = await dB.withdrawals.findAll({ where: { user_id } });
    if (!withdrawal) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Withdrawal not found');
    }
    return withdrawal;
}

const getWithdrawalById = async (id) => {
    const withdrawal = await dB.withdrawals.findOne({ where: { id } });
    if (!withdrawal) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Withdrawal not found');
    }
    return withdrawal;
}

const updateWithdrawal = async (id, status) => {
    const withdrawal = await dB.withdrawals.findOne({ where: { id } });
    if (!withdrawal) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Withdrawal not found');
    }
    withdrawal.status = status;
    await withdrawal.save();
    return withdrawal;
}



module.exports = { createWithdrawal, getWithdrawalsByUserId, updateWithdrawal, getWithdrawalById};
>>>>>>> origin/development
