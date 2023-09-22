const express = require('express');
const router = express.Router();
const { giftLunch, redeemLunch } = require('../controllers/lunch.controller');

/**
 * @swagger
 * tags:
 *      name:Lunch
 *      description:API endpoint to manage Lunch
 *
 */

/**
 * @swagger
 * /lunch:
 *   post:
 *     summary: Add Lunch
 *     tags: [Lunch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Lunch'
 */

router.post('/gift', giftLunch);
router.put('/redeem/:id', redeemLunch);

module.exports = router;
