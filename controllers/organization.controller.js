//External Imports
const httpStatus = require('http-status');
const { organizationService } = require('../services');
const ApiError = require('../utils/ApiError');
const Asyncly = require('../utils/Asyncly');

<<<<<<< HEAD
const createOrganization = Asyncly(async (req, res) => {
	const organization = await organizationService.createOrganization(
		req.body,
		req.user.id,
	);
	res.status(httpStatus.OK).send(organization);
=======
//Create New Organization
const createOrganization = Asyncly(async (req, res) => {
  const newOrganization = await organizationService.createOrganization(req.body, req.user.id);
  return res.status(httpStatus.CREATED).json({
    message: 'success',
    data: newOrganization,
  });
>>>>>>> origin/development
});


const inviteStaff = Asyncly(async (req, res) => {
<<<<<<< HEAD
	await organizationService.inviteStaff(req);
	res.status(httpStatus.OK).send({ message: 'User invited succesfully' });
});

module.exports = {
	createOrganization,
	inviteStaff,
};
=======
  await organizationService.inviteStaff(req)
  res.status(httpStatus.OK).send({ message: "User invited succesfully" });
});

module.exports = {
  createOrganization,
  inviteStaff,
};
>>>>>>> origin/development
