const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService } = require('../services');


//example
const signUp = Asyncly(async (req, res) => {
    authService.signUp(req.body);
});