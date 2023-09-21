const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { organizationService } = require('../services');


const createOrganization = Asyncly(async (req, res) => {
    const organization = await organizationService.createOrganization(req.body, req.user.id)
    res.status(httpStatus.OK).send(organization);
});

const inviteStaff = Asyncly(async (req, res) => {
  await organizationService.inviteStaff(req)
  res.status(httpStatus.OK).send({message: "User invited succesfully"});
});

module.exports = { 
  createOrganization,
  inviteStaff,
};