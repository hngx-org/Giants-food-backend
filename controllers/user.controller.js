const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, userService } = require('../services');

const getUserById = Asyncly(async (req, res) => {
    const { id } = req.params
    const user = await userService.getPersonById({ id })
    return res.status(httpStatus.OK).json({ user })
})

const getUserByEmail = Asyncly(async (req, res) => {
    const { email } = req.params
    const user = await userService.getPersonByEmail({ email })
    return res.status(httpStatus.OK).json({ user })
})

module.exports = { getUserById, getUserByEmail }