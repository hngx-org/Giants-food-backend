const express = require('express');
const router = express.Router();
const { giftLunch, redeemLunch } = require('../controllers/lunch.controller');

router.post('/gift', giftLunch);
router.put('/redeem/:id', redeemLunch);

module.exports = router;
