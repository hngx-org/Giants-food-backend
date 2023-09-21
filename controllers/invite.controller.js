const organization_iv = require('../models/organizationInvite.js');
const Asyncly = require('../utils/Asyncly');
const { generateInviteToken } = require('../services/token.service.js');


exports.invite = Asyncly(async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                Msg: 'Invalid email address'
            });
        }
        token = generateInviteToken();
    } catch (error) {
        console.log(error.message);
        return res.statusCode(500).send('Server error');
    }

})
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
