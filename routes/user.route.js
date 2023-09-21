<<<<<<< HEAD
const express = require('express');
const {
	getUserById,
	getUserByEmail,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/:id', getUserById);
router.get('/:email', getUserByEmail);
=======
const express = require("express");
const { getUserByIdOrEmail } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verify");
const auth = require("../middlewares/auth");


const router = express.Router();

router.get("/:key", verifyToken, auth(), getUserByIdOrEmail)

>>>>>>> origin/development

module.exports = router;
