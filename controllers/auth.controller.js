const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, userService } = require('../services');


const login = Asyncly(async (req, res) => {
    const user = await authService.login(req.body)
    res.status(httpStatus.OK).send(user);
});

const signup = Asyncly(async (req, res) => {
  const userDetail = await authService.signup(req.body)
  res.status(httpStatus.OK).send(userDetail);
});

module.exports = { 
  login,
  signup
};