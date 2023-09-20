const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, lunchService } = require('../services');

const fetchLunchesForOrg = async (req, res, next) => {
	const { getLunchesForOrganization } = lunchService;

	const orgId = null; // Organization ID will be gotten from access token when implemented
	const allLunches = await getLunchesForOrganization(orgId);
	res.status(200).json({
		status_code: httpStatus.OK,
		message: 'success',
		data: allLunches,
	});
};

module.exports = {
	fetchLunchesForOrg,
};
