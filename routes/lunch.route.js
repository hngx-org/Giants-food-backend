const express = require('express');
const { giftLunch, redeemLunch } = require('../controllers/lunch.controller');
const validate = require('../middlewares/validate');
const { createLunch } = require('../validation/lunch.validation');
const { verifyToken } = require('../middlewares/verify');

const router = express.Router();

router.post('/gift', verifyToken, validate(createLunch), giftLunch);
router.put('/redeem/:id', redeemLunch);

module.exports = router;
