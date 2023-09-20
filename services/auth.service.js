const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const token = require('../services/token.service');


const login = async (body) => { 
    const { email, password } = body;
    const user = await dB.users.findOne({ where: { email } });
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    const tokens = token.generateAuthTokens(user);
    return {user,tokens};
}


module.exports = { login };