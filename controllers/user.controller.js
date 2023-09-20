const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, userService } = require('../services');

const getUserById = Asyncly(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getPersonById({ id })
        return res.status(httpStatus.OK).json({ user })
    } catch (error) {
        return next(error);
    }
})

const getUserByEmail = Asyncly(async (req, res) => {
    try{
        const { email } = req.params
        const user = await userService.getPersonByEmail({ email })
        return res.status(httpStatus.OK).json({ user })
    } catch(error) {
        return next(error)
    } 
})

module.exports = { getUserById, getUserByEmail }