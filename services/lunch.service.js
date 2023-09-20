const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

const getUserLunch = ({ user_id }) => {
	//TODO: Handle fetching user lunch
	return user_id;
};

module.exports = {
	getUserLunch,
};
