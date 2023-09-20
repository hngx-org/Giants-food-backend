const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

const createWithdrawal = async (withdrawalBody) => {
    const withdrawal = await dB.withdrawals.create(withdrawalBody);
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