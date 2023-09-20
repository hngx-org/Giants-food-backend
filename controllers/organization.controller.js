//External Imports
const httpStatus = require('http-status');
const {
	createOrganizationValidator,
} = require('../validation/organization.validation');
const {
	createOrganizationService,
} = require('../services/organization.service');
const ApiError = require('../utils/ApiError');

//Create New Organization
const createOrganization = async (req, res) => {
	try {
		const { error } = createOrganizationValidator.body.validate(req.body);
		if (error)
			return new ApiError(
				httpStatus.BAD_REQUEST,
				error.details[0].message,
				true,
				'',
				true,
			);
		else {
			const newOrganization = await createOrganizationService(req.body);
			console.log('NewOrt\n' + newOrganization);
			return res.status(200).json({
				status_code: httpStatus.OK,
				message: 'success',
				data: newOrganization,
			});
		}
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: 'Failure',
			error: error.message,
		});
	}
};

module.exports = createOrganization;
