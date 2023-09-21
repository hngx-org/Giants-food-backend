const organization_iv = require('../models/organizationInvite.js');
const Asyncly = require('../utils/Asyncly');
const { generateToken } = require('../services/token.service.js');


exports.invite = Asyncly(async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                Msg: 'Invalid email address'
            });
        }
        token = generateToken();
    } catch (error) {
        console.log(error.message);
        return res.statusCode(500).send('Server error');
    }

})
// In process!!!