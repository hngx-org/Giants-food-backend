//External Imports
const httpStatus = require('http-status');
const { organizationService } = require('../services');
const ApiError = require('../utils/ApiError');
const Asyncly = require('../utils/Asyncly');

//Create New Organization
const createOrganization = Asyncly(async (req, res) => {
  const newOrganization = await organizationService.createOrganization(req.body, req.user.id);
  return res.status(httpStatus.CREATED).json({
    message: 'success',
    data: newOrganization,
  });
});


const inviteStaff = Asyncly(async (req, res) => {
  await organizationService.inviteStaff(req)
  res.status(httpStatus.OK).send({ message: "User invited succesfully" });
});


const acceptInvite = Asyncly(async (req, res) => {
	const inviteToken = req.query.token;

    if (!inviteToken) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invite token not found');
    }

    const { first_name, last_name, email, phone_number, password_hash } = req.body;

    if (!first_name || !last_name || !email || !phone_number || !password_hash) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid details');
    }

    const userBody = {
      first_name,
      last_name,
      email,
      phone_number,
      password_hash: password_hash, 
    };

    const data = await organizationService.handleOrganizationOnboarding(
      inviteToken,
      userBody
    );

    if (data.message === 'User already belongs to the organization') {
      return res.status(httpStatus.OK).json({
        status: true,
        message: data.message,
      });
    }

    res.status(httpStatus.CREATED).json({
      status: true,
      message: data.message,
      user: data.user,
    });
});


module.exports = {
	createOrganization,
	inviteStaff,
	acceptInvite,
};