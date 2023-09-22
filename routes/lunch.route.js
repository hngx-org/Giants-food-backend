const express = require("express")
const router = express.Router()
const { verifyToken } = require('../middlewares/verify')
const lunchController = require('../controllers/lunch.controller')
const auth = require("../middlewares/auth")
const lunchValidation = require("../validation/lunch.validation")
const validate = require("../middlewares/validate")


router.get('', verifyToken, auth(), lunchController.fetchLunchesForOrg);
router.post('', verifyToken, auth(), validate(lunchValidation.createLunch),lunchController.giftLunch);
// router.put('/redeem/:id', redeemLunch);

router.get('/user-lunch/:id',verifyToken, auth(), lunchController.fetchSingleLunch);

router.get('/:user_id', verifyToken, auth(), lunchController.getUserLunch);

module.exports = router;
