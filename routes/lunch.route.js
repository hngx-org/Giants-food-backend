const express = require('express');
const router = express.Router();
const {
	giftLunch,
	redeemLunch,
	fetchLunchesForOrg,
	fetchSingleLunch
} = require('../controllers/lunch.controller');

router.post('/gift', giftLunch);
router.get('/lunch/:id',fetchSingleLunch);
router.put('/redeem/:id', redeemLunch);
router.get('/', fetchLunchesForOrg);

module.exports = router;
