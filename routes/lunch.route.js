const express = require('express');
const router = express.Router();
const {
	giftLunch,
	redeemLunch,
	fetchLunchesForOrg,
} = require('../controllers/lunch.controller');

router.post('/gift', giftLunch);
router.put('/redeem/:id', redeemLunch);
router.get('/', fetchLunchesForOrg);

module.exports = router;
