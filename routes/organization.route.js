const express = require('express');
// const validate = require('../middlewares/validate');
const { acceptInvite } = require('../controllers');

const router = express.Router();

router.post('/accept-invite', acceptInvite);

module.exports = router;