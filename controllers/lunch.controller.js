const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, lunchService } = require('../services');
const lunch = require('../models/lunch');

const giftLunch = Asyncly(async (req, res) => {
	const { receiver, quantity, note } = req.body;
	const sender = req.user.id;
	const lunch = await lunchService.giftLunch({
		sender,
		receiver,
		quantity,
		note,
	});
	return res.status(httpStatus.CREATED).json({ lunch });
});

const redeemLunch = Asyncly(async (req, res, next) => {
	const { id } = req.params;
	const lunch = await lunchService.redeemLunch({ id });
	return res.status(httpStatus.OK).json({ lunch });
});

const fetchLunchesForOrg = Asyncly(async (req, res, next) => {
	const orgId = null; // Organization ID will be gotten from access token when implemented
	const allLunches = await lunchService.getLunchesForOrganization(orgId);
	res.status(httpStatus.OK).json({
		data: allLunches,
	});
});

const fetchSingleLunch = async (request, response) => {
	const lunchId = request.params.id;
	const singleLunch = await lunchService.getSingleLunch(lunchId);
	if (singleLunch.statusCode == 200) {
		response.status(200).json(singleLunch);
	}else {
		response.status(404).json(singleLunch);
	}
};


module.exports = {
	giftLunch,
	redeemLunch,
	fetchLunchesForOrg,
	fetchSingleLunch
};
