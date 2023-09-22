const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validation/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
// const { verifyToken, verifyEmailToken } = require('../middlewares/verify');

const router = express.Router();

/**
 * @swagger
 * tags:
 * 		name:Auth
 * 		description: API endpoints for authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: " "
 *             password_hash: " "
 */

router.post('/login', validate(authValidation.login), authController.login);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: " "
 *             first_name: " "
 *             last_name: " "
 *             phone_number: " "
 *             password_hash: " "
 *             profile_picture: " "
 */

router.post(
	'/signup',
	validate(authValidation.register),
	authController.signup,
);

module.exports = router;
