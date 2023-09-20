const express = require('express');
const router = express.Router();
const {
	giftLunch,
	redeemLunch,
	getUserLunch,
} = require('../controllers/lunch.controller');

router.post('/gift', giftLunch);
router.put('/redeem/:id', redeemLunch);
router.get('/:user_id', getUserLunch);

module.exports = router;
