const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validation/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
// const { verifyToken, verifyEmailToken } = require('../middlewares/verify');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);

router.post(
	'/signup',
	validate(authValidation.register),
	authController.signup,
	);

router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
	
module.exports = router;
