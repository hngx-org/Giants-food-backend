const express = require("express")
const router = express.Router()
const { verifyToken } = require('../middlewares/verify')
<<<<<<< HEAD
const { giftLunch, redeemLunch } = require('../controllers/lunch.controller')

router.post('', verifyToken, giftLunch);
router.put('/redeem/:id', verifyToken, redeemLunch);
=======
const lunchController = require('../controllers/lunch.controller')
const auth = require("../middlewares/auth")
const lunchValidation = require("../validation/lunch.validation")
const validate = require("../middlewares/validate")

>>>>>>> b0f6664b77d8eb3aa3fbb8055e8a95f71ebf21c4

router.get('', verifyToken, auth(), lunchController.fetchLunchesForOrg);
router.post('', verifyToken, auth(), validate(lunchValidation.createLunch),lunchController.giftLunch);
// router.put('/redeem/:id', redeemLunch);

router.get('/user-lunch/:id',verifyToken, auth(), lunchController.fetchSingleLunch);

router.get('/:user_id', verifyToken, auth(), lunchController.getUserLunch);

module.exports = router;