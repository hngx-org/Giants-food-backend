const { jwt, verify } = require("jsonwebtoken");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/auth');
const { dB } = require('../models');

let staticy;

const verifyToken = async(req,res,next) => {
    let token = req.headers.authorization;
    if (!token) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    token = token.split(" ")[1];

    verify(token, config.jwt.secret, async(err, decoded) => {
        if(err) {
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        staticy = decoded.sub;
        req.user = await dB.users.findOne({ where: { id : staticy } });
        next();
    })
    
     
}

const verifyEmailToken = async(req,res,next) => {
    let token = req?.query?.token;
    if (!token) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }

    verify(token, config.jwt.secret, async(err, decoded) => {
        if(err) {
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        if(decoded) { 
            staticy = decoded.sub;
            req.user = await dB.users.findOne({ where: { id : staticy } });
            return next();
        }
    })
    
     
}



const jwtAuth = {
    verifyToken,
    verifyEmailToken,
}

module.exports = jwtAuth;