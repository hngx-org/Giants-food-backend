const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, organizationService } = require('../services');

const login = Asyncly(async (req, res) => {
	const user = await authService.login(req.body);
	const organization = await organizationService.findOrganization(user.user.org_id)
	if (organization) {
		user.user.organization = organization
	}
	res.status(httpStatus.OK).send(user);
});


const signup = Asyncly(async (req, res) => {
	const userDetail = await authService.signup(req.body);
	const organization = await organizationService.findOrganization(user.user.org_id)
	if (organization) {
		user.user.organization = organization
	}
	res.status(httpStatus.CREATED).send(userDetail);
});


const forgotPassword = Asyncly(async (req, res) => {
	const resetPasswordToken = await authService.forgotPassword(req.body);
	res.status(httpStatus.OK).send({ resetPasswordToken });
});

const resetPassword = Asyncly(async (req, res) => {
	const { token } = req.query;
	const user = await authService.resetPassword(token, req.body);
	res.status(httpStatus.OK).send(user);
});


module.exports = {
	login,
	signup,
	forgotPassword,
	resetPassword
};
