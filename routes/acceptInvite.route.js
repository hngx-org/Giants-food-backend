const express = require('express');
const validate = require('../middlewares/validate');
const { organizationValidation } = require('../validation/');
const { acceptInvite } = require('../controllers/acceptInvite.controller');

const router = express.Router();

router.post('/accept-invite',
    validate(organizationValidation.acceptInvite),
    acceptInvite
);

module.exports = router;