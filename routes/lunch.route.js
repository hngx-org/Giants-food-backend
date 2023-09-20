const express = require('express');
const Asyncly = require('../utils/Asyncly');
const lunchController = require('../controllers/lunch.controller');

const router = express.Router();

router.get('/', Asyncly(lunchController.fetchLunchesForOrg));

module.exports = router;
