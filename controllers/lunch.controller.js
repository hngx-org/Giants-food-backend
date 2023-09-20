const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, lunchService } = require('../services');

const giftLunch = Asyncly(async (req, res, next) => {
	const { receiver, quantity, note } = req.body;
	try {
		const sender = req.user.id;
		const lunch = await lunchService.giftLunch({
			sender,
			receiver,
			quantity,
			note,
		});
		return res.status(httpStatus.CREATED).json({ lunch });
	} catch (error) {
		return next(error);
	}
});

const redeemLunch = Asyncly(async (req, res, next) => {
	const { id } = req.params;
	try {
		const lunch = await lunchService.redeemLunch({ id });
		return res.status(httpStatus.OK).json({ lunch });
	} catch (error) {
		return next(error);
	}
});

const fetchLunchesForOrg = Asyncly(async (req, res, next) => {
	const orgId = null; // Organization ID will be gotten from access token when implemented
	const allLunches = await lunchService.getLunchesForOrganization(orgId);

	res.status(httpStatus.OK).json({
		status_code: httpStatus.OK,
		message: 'success',
		data: allLunches,
	});
});

const fetchSingleLunch = async (request, response) => {
	const lunchId = req.params.id;
	const singleLunch = lunchService.getSingleLunch(lunchId);

	response.status(200).json({
		status_code: httpStatus.OK,
		message: 'Lunch fetched Successfully',
		data: singleLunch,
	});
};

module.exports = {
	giftLunch,
	redeemLunch,
	fetchLunchesForOrg,
};
