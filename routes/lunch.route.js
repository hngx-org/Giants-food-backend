const express = require('express');
const lunchController = require('../controllers/lunch.controller');

const router = express.Router();

router.get('/', lunchController.fetchLunchesForOrg);

module.exports = router;
