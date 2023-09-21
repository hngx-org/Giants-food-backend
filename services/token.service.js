const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/auth');
const userService = require('./user.service');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
	const payload = {
		sub: userId,
		iat: moment().unix(),
		exp: expires.unix(),
		type,
	};
	return jwt.sign(payload, secret);
};

const generateInviteTokenGon = (inviteObj, expires, type, secret = config.jwt.secret) => {
	const payload = {
		sub: inviteObj,
		iat: moment().unix(),
		exp: expires.unix(),
		type,
	};
	return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
	const user = await dB.users.findOne({id:userId});

	user.refresh_token = token;
	await user.save();

	
	return user;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
	const payload = jwt.verify(token, config.jwt.secret);
	const tokenDoc = await dB.tokens.findOne({
		where: { token, type, user: payload.sub, blacklisted: false },
	});
	if (!tokenDoc) {
		throw new Error('Token not found');
	}
	return tokenDoc;
};

const verifyInviteToken = async (token, type) => {
	const payload = jwt.verify(token, config.jwt.secret);
  const {id, email} = payload.sub;
	const inviteDoc = await dB.organizationInvites.findOne({
		where: { token },
	});
  if(!inviteDoc || !payload) {
    throw new ApiError(400,)
  }
	return {id, email};
};

/**
 * Generate invite tokens
 * @param {string || number} user
 * @returns {Promise<Object>}
 */
const generateInviteToken = async (id, email) => {
	const inviteTokenExpires = moment().add(
		1,
		'd',
	);
	const inviteToken = generateInviteTokenGon(
		{id,email},
		inviteTokenExpires,
		tokenTypes.ORG_INVITE,
	);

	return {
		token: inviteToken,
		expires: inviteTokenExpires.toDate(),
	};
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
	const accessTokenExpires = moment().add(
		config.jwt.accessExpirationMinutes,
		'm',
	);
	const accessToken = generateToken(
		user.id,
		accessTokenExpires,
		tokenTypes.ACCESS,
	);

	const refreshTokenExpires = moment().add(
		config.jwt.refreshExpirationDays,
		'days',
	);
	const refreshToken = generateToken(
		user.id,
		refreshTokenExpires,
		tokenTypes.REFRESH,
	);
	// await saveToken(refreshToken, user, refreshTokenExpires, tokenTypes.REFRESH);

	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate(),
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate(),
		},
	};
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
	const user = await userService.getUserByEmail(email);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
	}
	const expires = moment().add(
		config.jwt.resetPasswordExpirationMinutes,
		'minutes',
	);
	const resetPasswordToken = generateToken(
		user.id,
		expires,
		tokenTypes.RESET_PASSWORD,
	);
	await saveToken(
		resetPasswordToken,
		user.id,
		expires,
		tokenTypes.RESET_PASSWORD,
	);
	return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
	const expires = moment().add(
		config.jwt.verifyEmailExpirationMinutes,
		'minutes',
	);
	const verifyEmailToken = generateToken(
		user.id,
		expires,
		tokenTypes.VERIFY_EMAIL,
	);
	await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
	return verifyEmailToken;
};

module.exports = {
	generateToken,
	saveToken,
	verifyToken,
	generateAuthTokens,
	generateResetPasswordToken,
	generateVerifyEmailToken,
  generateInviteToken,
};
