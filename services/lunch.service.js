const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

const giftLunch = async ({ sender, receiver, quantity, note, orgID }) => {
	const newLunch = await dB.lunches.create({
		sender_id: sender,
		receiver_id: receiver,
		quantity,
		note,
		redeemed: false,
		org_id: orgID,
	});
	if (!newLunch) {
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Failed to create lunch',
		);
	}
	return newLunch.dataValues;
};

module.exports = {
	giftLunch,
};
