const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Generate token
 * @param {}
 * @returns {}
 */
const createOrganization = (userId, expires, type, secret = config.jwt.secret) => {
};