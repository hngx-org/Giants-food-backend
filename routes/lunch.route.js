const express = require('express');
const router = express.Router();
const {
	giftLunch,
	redeemLunch,
	fetchLunchesForOrg,
} = require('../controllers/lunch.controller');
const { verifyToken } = require('../middlewares/verify');
const auth = require('../middlewares/auth');

router.post('/gift', giftLunch);
router.put('/redeem/:id', redeemLunch);
router.get('/', verifyToken, auth(), fetchLunchesForOrg);

module.exports = router;
