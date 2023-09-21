const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { withdrawalService } = require('../services');

const createWithdrawal = Asyncly(async (req, res) => {
    const { amount, bank_name, bank_number, bank_code } = req.body
    const user_id = req.user.id
    const org_id = req.user.org_id
    const withdrawal = await withdrawalService.createWithdrawal({ amount, user_id, org_id })
    return res.status(httpStatus.CREATED).json({ withdrawal })
})

const getWithdrawalsByUserId = Asyncly(async (req, res) => {
    const { user_id } = req.params
    const withdrawal = await withdrawalService.getWithdrawalsByUserId({ user_id })
    return res.status(httpStatus.OK).json({ withdrawal })
})

const getWithdrawalById = Asyncly(async (req, res) => {
    const { withdrawal_id } = req.params
    const withdrawal = await withdrawalService.getWithdrawalById({ withdrawal_id })
    return res.status(httpStatus.OK).json({ withdrawal })
})

const updateWithdrawal = Asyncly(async (req, res) => {
    const { withdrawal_id } = req.params
    const { status } = req.body
    const withdrawal = await withdrawalService.updateWithdrawal({ withdrawal_id, status })
    return res.status(httpStatus.OK).json({ withdrawal })
})

module.exports = { createWithdrawal, getWithdrawalsByUserId, updateWithdrawal,getWithdrawalById}