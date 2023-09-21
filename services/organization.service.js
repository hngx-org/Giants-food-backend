const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const emailService = require('./email.service');
const tokenService = require('./token.service');


const createOrganization = async (body, id) => {
    const organization = await dB.organizations.create(body)

    if (!organization) {
        return ApiError(httpStatus.BAD_GATEWAY, 'Organization was not created')
    }

    await userService.makeAdmin(id, organization.id)

    return organization;
}

const inviteStaff = async (req) => { 
    const organization = await getOrg(req.user.org_id)
    if(!organization || !(req.user.is_admin)) {
        return ApiError(httpStatus.BAD_REQUEST, 'Organization does not exist or you lack the necessary priviledges')
    }
    const token = await tokenService.generateInviteToken(req.user.org_id);
    await dB.organizationInvites.create({email: req.body.email, token: token.token})
    // return await emailService.sendInvite(req.body.email, token, organization.name) // When email configuration is done it will be available
}

const getOrg = async(id) => {
    return organization = await dB.organizations.findOne({id})
}




module.exports = { 
    createOrganization,
    inviteStaff,
};