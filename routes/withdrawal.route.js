const express = require("express");
const router = express.Router();

const { getWithdrawalById, getWithdrawalsByUserId, createWithdrawal, updateWithdrawal} = require("../controllers/withdrawal.controller");

router.post("/withdrawal", createWithdrawal);
router.get("/withdrawal/:id", getWithdrawalsByUserId);
router.get("/withdrawal/:withdrawal_id", getWithdrawalById);
router.put("/withdrawal/:withdrawal_id", updateWithdrawal);



module.exports = router;