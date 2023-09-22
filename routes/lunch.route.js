const express = require("express")
const router = express.Router()
const { verifyToken } = require('../middlewares/verify')
const lunchController = require('../controllers/lunch.controller')
const auth = require("../middlewares/auth")

router.get('', (req, res) => {
    res.json({hi: "there"})
})
router.post('', verifyToken, auth(), lunchController.giftLunch);
// router.put('/redeem/:id', redeemLunch);

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
