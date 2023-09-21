const express = require('express');
<<<<<<< HEAD
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { verifyToken, verifyEmailToken } = require('../middlewares/verify');
const { organizationController } = require("../controllers");
const { organizationValidation } = require("../validation");


const router = express.Router();


router.post(
    "/",
    validate(organizationValidation.createOrganization),
    verifyToken, auth(),
    organizationController.createOrganization
);
router.post('/invite', verifyToken, auth(), validate(organizationValidation.inviteStaff), organizationController.inviteStaff);
// router.post('/accept-invite', verifyToken, auth(), validate(organizationValidation.acceptInvite), organizationController.inviteStaff);


module.exports = router;
=======
// const validate = require('../middlewares/validate');
const { acceptInvite } = require('../controllers');

const router = express.Router();

router.post('/accept-invite', acceptInvite);

module.exports = router;
>>>>>>> 6b5f091ec51f02ee8709c4f7e4dae4de86524265
