const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { organizationService } = require('../services');

const acceptInvite = Asyncly(async (req, res) => {
    const InviteToken = req.query.inviteToken;
    const userBody = req.body;
    organizationService.handleOrganizationOnboarding(InviteToken, userBody);
});

module.exports = { acceptInvite };
