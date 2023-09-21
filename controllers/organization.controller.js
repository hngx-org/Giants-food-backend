//External Imports
const httpStatus = require('http-status');
const { organizationService } = require('../services');
const ApiError = require('../utils/ApiError');
const Asyncly = require('../utils/Asyncly');

//Create New Organization
const createOrganization = Asyncly(async (req, res) => {
  const newOrganization = await organizationService.createOrganization(req.body, req.user.id);
  return res.status(httpStatus.CREATED).json({
    status_code: httpStatus.CREATED,
    message: 'success',
    data: newOrganization,
  });
});


const inviteStaff = Asyncly(async (req, res) => {
  await organizationService.inviteStaff(req)
  res.status(httpStatus.OK).send({ message: "User invited succesfully" });
});

module.exports = {
  createOrganization,
  inviteStaff,
};