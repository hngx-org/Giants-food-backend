const express = require("express")
const router = express.Router()
const { verifyToken } = require('../middlewares/verify')
const lunchController = require('../controllers/lunch.controller')

router.get('', (req, res) => {
    res.json({hi: "there"})
})
router.post('', lunchController.giftLunch);
// router.put('/redeem/:id', redeemLunch);


module.exports = router;
