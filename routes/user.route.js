const express = require('express');
const { getUserByIdOrEmail } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/verify');
const auth = require('../middlewares/auth');

const router = express.Router();
/**
 * @swagger
 * tags:
 *      name: User
 *      description: API endpoints to mangage User resource
 *
 */

/**
 * @swagger
 * /users/{key}:
 *   get:
 *     summary: Get User by Id or Email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: id or email of the user
 */

router.get('/:key', verifyToken, auth(), getUserByIdOrEmail);

module.exports = router;
