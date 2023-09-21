const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');

const { userService } = require('../services');

const getUserById = Asyncly(async (req, res) => {
	const { id } = req.params;
	const user = await userService.getPersonById({ id });
	return res.status(httpStatus.OK).json({ user });
});

const getUserByEmail = Asyncly(async (req, res) => {
	const { email } = req.params;
	const user = await userService.getUserByEmail({ email });
	return res.status(httpStatus.OK).json({ user });
});

const getUsersByOrgId = Asyncly(async (req, res) => {
    const { org_id } = req.params
    const users = await userService.getPeopleByOrgId({ org_id });
    return res.status(httpStatus.OK).json({ users });
}) 
module.exports = { getUserById, getUserByEmail, getUsersByOrgId };
