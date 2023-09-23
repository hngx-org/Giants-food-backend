const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

const getUserById = Asyncly(async (req, res) => {
	const { id } = req.params;
	const user = await userService.getPersonById({ id });
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

	return res.status(httpStatus.OK).json(user);
});

const getUserByEmail = Asyncly(async (req, res) => {
	const { email } = req.params;
	const user = await userService.getUserByEmail({ email });
	return res.status(httpStatus.OK).json(user);
});

const getUsersByOrgId = Asyncly(async (req, res) => {
    const { org_id } = req.params
    const users = await userService.getPeopleByOrgId(org_id );
	if (!users) throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
    return res.status(httpStatus.OK).json(users);
}) 

const getUserByIdOrEmail = Asyncly(async (req, res) => {
    const { key } = req.params
    let user = await userService.getUserByEmail(key);
	if(!user){ 
		user = await userService.getUserById(key)
	}
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    return res.status(httpStatus.OK).send(user);
}) 
module.exports = { getUserById, getUserByEmail, getUsersByOrgId, getUserByIdOrEmail };

