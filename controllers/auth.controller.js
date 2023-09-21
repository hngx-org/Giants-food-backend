const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService } = require('../services');


const login = Asyncly(async (req, res) => {
    const user = await authService.login(req.body)
    res.status(httpStatus.OK).send(user);
});

const signup = Asyncly(async (req, res) => {
  const user = await authService.signup(req.body)
  res.status(httpStatus.OK).send(user);
});

module.exports = { 
  login,
  signup
};