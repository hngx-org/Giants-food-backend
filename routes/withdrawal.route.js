const express = require('express');
const router = express.Router();

// const createWithdrawalSchema = require("..validation/withdrawal.validation");

const { withdrawalController } = require('../controllers');
const validate = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/verify');
const { createWithdrawal } = require('../validation/withdrawal.validation');
const auth = require('../middlewares/auth');

router.post(
	'/',
	verifyToken,
	auth(),
	withdrawalController.createWithdrawal,
);
// router.get("/:id", withdrawalController.getWithdrawalsByUserId);
// router.get("/:withdrawal_id", withdrawalController.getWithdrawalById);
// router.put("/:withdrawal_id", withdrawalController.updateWithdrawal);

module.exports = router;
