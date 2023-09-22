const express = require('express');
const router = express.Router();

// const createWithdrawalSchema = require("..validation/withdrawal.validation");

const { withdrawalController } = require('../controllers');
const validate = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/verify');
const { createWithdrawal } = require('../validation/withdrawal.validation');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *      name:Withdrawal
 *      description:API endpoint to manage Withdrawal
 *
 */

/**
 * @swagger
 * /withdrawal:
 *   post:
 *     summary: Create Withdrawal
 *     tags: [Withdrawal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Withdrawal'
 */

router.post(
	'/',
	verifyToken,
	auth(),
	validate(createWithdrawal),
	withdrawalController.createWithdrawal,
);
// router.get("/:id", withdrawalController.getWithdrawalsByUserId);
// router.get("/:withdrawal_id", withdrawalController.getWithdrawalById);
// router.put("/:withdrawal_id", withdrawalController.updateWithdrawal);

module.exports = router;
