const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

const createWithdrawal = async (user) => {
	// const user = await dB.users.findOne({ where: { id: user_id } });
	if (!user.lunch_credit_balance || user.lunch_credit_balance == 0) {
	    throw new ApiError(httpStatus.NO_CONTENT, 'No available lunches');
	}
	let amount;
	let balance = user.lunch_credit_balance
	const organization = await dB.organizations.findOne({
		where: { id: user.org_id },
	});
	if (!organization) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User Organization not found');
	}
	amount = parseInt(balance) * parseInt(organization.lunch_price);

	// const lunches = await dB.lunches.findAll({	where: {receiver_id: user_id}})
	await user.decrement("lunch_credit_balance", { by: balance})
	const withdrawal = await dB.withdrawals.create({user_id:user.id, amount, status:'successful' });

	return withdrawal;
};

const getWithdrawalsByUserId = async (user_id) => {
	const withdrawal = await dB.withdrawals.findAll({ where: { user_id } });
	if (!withdrawal) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Withdrawal not found');
	}
	return withdrawal;
};

const getWithdrawalById = async (id) => {
	const withdrawal = await dB.withdrawals.findOne({ where: { id } });
	if (!withdrawal) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Withdrawal not found');
	}
	return withdrawal;
};

const updateWithdrawal = async (id, status) => {
	const withdrawal = await dB.withdrawals.findOne({ where: { id } });
	if (!withdrawal) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Withdrawal not found');
	}
	withdrawal.status = status;
	await withdrawal.save();
	return withdrawal;
};

module.exports = {
	createWithdrawal,
	getWithdrawalsByUserId,
	updateWithdrawal,
	getWithdrawalById,
};
