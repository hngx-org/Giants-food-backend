const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { lunchService } = require('../services');

const giftLunch = Asyncly(async (req, res) => {
	const { receiver, quantity, note } = req.body;
	const { id: sender, org_id } = req.user;
	const lunch = await lunchService.giftLunch({
		sender,
		receiver,
		quantity,
		note,
		orgID: org_id,
	});
	return res.status(httpStatus.CREATED).json({ lunch });
});

const redeemLunch = Asyncly(async (req, res, next) => {
	const { id } = req.params;
	const lunch = await lunchService.redeemLunch({ id });
	return res.status(httpStatus.OK).json({ lunch });
});

module.exports = { giftLunch, redeemLunch };
