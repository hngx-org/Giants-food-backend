const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');

const { userService } = require('../services');

const getUserBankAccount = Asyncly(async (req, res) => {
	const { id } = req.params;
	const user = await userService.getPersonById({ id });
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	const accountDetails = {bank: user.bank, bank_number: user.bank_number, bank_code: user.bank_code }

	return res.status(httpStatus.OK).send(accountDetails);
});


const updateUserBankAccount = Asyncly(async (req, res) => {
    const { id } = req.params
    const users = await userService.updateUserById(id, req.body);
    return res.status(httpStatus.OK).send({ users });
}) 

module.exports = { getUserBankAccount, updateUserBankAccount };
