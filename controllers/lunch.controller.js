const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, lunchService } = require('../services');
const ApiError = require('../utils/ApiError');

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
	const orgId = req.user.org_id;
	if (!orgId) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'User is not part of an organisation',
			true,
		);
	}
	const allLunches = await lunchService.getLunchesForOrganization(orgId);
	if (!allLunches) {
		res
			.status(httpStatus.OK)
			.json({ message: 'No lunch found for organisation' });
	} else {
		res.status(httpStatus.OK).json({
			data: allLunches,
		});
	}
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
