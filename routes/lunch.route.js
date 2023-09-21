const express = require("express")
const router = express.Router()
const { verifyToken } = require('../middlewares/verify')
const { giftLunch, redeemLunch } = require('../controllers/lunch.controller')

router.get('', (req, res) => {
    res.json({hi: "there"})
})
router.post('', verifyToken, giftLunch);
router.put('/redeem/:id', redeemLunch);


module.exports = router;
