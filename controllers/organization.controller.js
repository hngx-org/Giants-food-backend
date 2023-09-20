//External Imports
const httpStatus = require('http-status');
const {
	createOrganizationValidator,
} = require('../validation/organization.validation');
const {
	createOrganizationService,
} = require('../services/organization.service');
const ApiError = require('../utils/ApiError');
const Asyncly = require('../utils/Asyncly');

//Create New Organization
const createOrganizationController = Asyncly(async (req, res, next) => {
	const newOrganization = await createOrganizationService(req.body);
	return res.status(httpStatus.CREATED).json({
		status_code: httpStatus.CREATED,
		message: 'success',
		data: newOrganization,
	});
});

module.exports = { createOrganizationController };
