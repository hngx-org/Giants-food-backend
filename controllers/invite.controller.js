const organization_iv = require('../models/organizationInvite.js');
const Asyncly = require('../utils/Asyncly');
const {generateToken} = require('../services/token.service.js')

exports.invite = Asyncly(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            Msg: 'Invalid email address'
        });
    }

    token = generateToken();
})
// In process!!!