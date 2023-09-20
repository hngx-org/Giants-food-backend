const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, userService } = require('../services');
const ApiError = require('../utils/ApiError');

const getUserById = Asyncly(async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.getPersonById({ id })
    if (user) {
        return res.status(httpStatus.OK).json({ user })
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

})

const getUserByEmail = Asyncly(async (req, res, next) => {
    const { email } = req.params
    const user = await userService.getPersonByEmail({ email })
    if (user) {
        return res.status(httpStatus.OK).json({ user })
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
})

module.exports = { getUserById, getUserByEmail }