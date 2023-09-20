//External Imports
const httpStatus = require('http-status');
const { CreateOrganization } = require('../validation/organization.validation');
//Require Gnobu's import service here

//Create an Organization
const CreateOrganization = async (req, res) => {
	const { err } = CreateOrganization.validate(req.body);
	if (err) throw err;

	const newOrganization = await NULL; //Awaiting gnobu's service
	res.status(200).json({
		status_code: httpStatus.OK,
		message: 'success',
		data: newOrganization,
	});
};

module.exports = {
	CreateOrganization,
};
