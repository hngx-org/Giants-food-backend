const express = require('express');
const router = express.Router();
const { giftLunch, redeemLunch } = require('../controllers/lunch.controller');

router.get('', (req, res) => {
    res.json({hi: "there"})
})
router.post('', verifyToken, giftLunch);
router.put('/redeem/:id', redeemLunch);


module.exports = router;
