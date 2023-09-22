const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const ApiError = require('../utils/ApiError');

const { lunchService } = require('../services');

const giftLunch = Asyncly(async (req, res) => {
	console.log(req.user.id)
    if(req.user.id == req.body.receiver_id){
		throw new ApiError(httpStatus.FORBIDDEN, 'You cannot gift yourself a lunch');
    }
    const lunch = await lunchService.createLunch({ sender_id: req.user.id, org_id:req.user.org_id, ...req.body });
    return res.status(httpStatus.CREATED).json({ Message: "Lunch gifted successfully" });
});

const getUserLunch = Asyncly(async (req, res) => {
	const { user_id } = req.params;
	const userLunch = await lunchService.getUserLunch(user_id);
	if (!userLunch) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	return res.status(httpStatus.OK).json({ userLunch });
});

const fetchLunchesForOrg = Asyncly(async (req, res) => {
	const orgId = req.body.org_id;
	const allLunches = await lunchService.getLunchesForOrganization(orgId);
	res.status(httpStatus.OK).send(allLunches);
});

const fetchSingleLunch = Asyncly(async (req, res) => {
	const lunchId = req.params.id;
	const singleLunch = await lunchService.getSingleLunch(lunchId);
	
	if (!singleLunch) throw new ApiError(httpStatus.NOT_FOUND, 'Sorry could not find lunch');
	res.status(httpStatus.OK).send(singleLunch);
})

module.exports = {
	giftLunch,
	fetchLunchesForOrg,
	fetchSingleLunch,
	getUserLunch,
};
