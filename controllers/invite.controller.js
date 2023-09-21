const sequelize = require('sequelize');
const dataType = sequelize.dataType;

const organization_iv = require('../models/organizationInvite.js');
const {getUserByEmail} = require('../services/user.service.js');
const Asyncly = require('../utils/Asyncly');
const { generateInviteToken } = require('../services/token.service.js');
const {sendInvite} = require('../services/email.service.js');

exports.invite = Asyncly(async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({
				Msg: 'Invalid email address',
			});
		}
		const toInvite = await getUserByEmail(email);
		if (!toInvite) {
			return res.status(400).json({
				Msg: 'Not a registered user',
			});
		}

		const [token, expires] = generateInviteToken(toInvite.id, email);
		const newInvite = await organization_iv.create({
			email: email,
			token: token,
			TTL: expires
		});


		console.log(newInvite);
		sendInvite(email,token, 'giantOrg');
		return res.status(200).json({
			message: "success",
		});
	} catch (error) {
		console.error(error.message);
		return res.statusCode(500).send('Server error');
	}
});
// In process!!!
/**
POST
/api/organization/invite
Description: this endpoint handles creating an invite which will be sent to the email of the user that should be invited
A token is generated and the id of that invite, which is what is populated in the organization-invite.
The token will contain the organization_id for us to know what organization is creating the invite


Body{
email
}

RESPONSE
{ "message": "success", }

 */
