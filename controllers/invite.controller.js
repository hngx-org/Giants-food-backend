const organization_iv = require('../models/organizationInvite.js');
const Asyncly = require('../utils/Asyncly');
<<<<<<< HEAD
const { generateInviteToken } = require('../services/token.service.js');

=======
const {generateToken} = require('../services/token.service.js')
>>>>>>> origin/invite

exports.invite = Asyncly(async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                Msg: 'Invalid email address'
            });
        }
<<<<<<< HEAD
        token = generateInviteToken();
=======
        token = generateToken();
>>>>>>> origin/invite
    } catch (error) {
        console.log(error.message);
        return res.statusCode(500).send('Server error');
    }

})
<<<<<<< HEAD
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
=======
// In process!!!
>>>>>>> origin/invite
