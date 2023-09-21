const express = require("express")
const router = express.Router()
const { verifyToken } = require('../middlewares/verify')
const { giftLunch, redeemLunch } = require('../controllers/lunch.controller')

router.post('', verifyToken, giftLunch);
router.put('/redeem/:id', verifyToken, redeemLunch);


module.exports = router;