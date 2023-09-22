const express = require("express");
const {userController} = require("../controllers");
const { verifyToken } = require("../middlewares/verify");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const bankAccountValidation = require("../validation/bankAccount.validation");
const bankAccountController = require("../controllers/bankAccount.controller");

const router = express.Router();
router.get('/:id', verifyToken, auth(), bankAccountController.getUserBankAccount);
router.post('/:id', verifyToken, auth(), validate(bankAccountValidation.setAccount), bankAccountController.updateUserBankAccount);


module.exports = router;