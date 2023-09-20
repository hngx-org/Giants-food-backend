const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService } = require('../services');

const { getLunchesForOrganization,getSingleLunch } = require('../services/lunch.service');

const fetchLunchesForOrg = async (req, res) => {
	

	const orgId = null; // Organization ID will be gotten from access token when implemented
	const allLunches = await getLunchesForOrganization(orgId);

	res.status(200).json({
		status_code: httpStatus.OK,
		message: 'success',
		data: allLunches,
	});
};

const fetchSingleLunch = async (request,response) => {
	const lunchId = req.params.id
	const singleLunch = getSingleLunch(lunchId)
	
	response.status(200).json({
		status_code: httpStatus.OK,
		message: "Lunch fetched Successfully",
		data: singleLunch
	})
}

module.exports = {
	fetchLunchesForOrg,
};
