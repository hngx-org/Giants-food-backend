const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');

const { lunchService, redeemNewLunch } = require('../services');

const giftLunch = Asyncly(async (req, res) => {
    if(req.user.id == req.body.receiver_id){
        return res.status(httpStatus.FORBIDDEN).json({ Message: "You cannot gift yourself a lunch" });
    }
    const lunch = await lunchService.createLunch({ sender_id: req.user.id, org_id: req.user.org_id, ...req.body });

    return res.status(httpStatus.CREATED).json({ Message: "Lunch gifted successfully" });
});

const redeemLunch = Asyncly(async (req, res) => {
	const id = req.params.id;
    console.log('id= ', id, req.params)
	const user = req.user;
    console.log('first contact= ', id, user.id)
	const lunch = await lunchService.redeemNewLunch({ id, user });
	return res.status(httpStatus.OK).json({ "message": "success" });
});

module.exports = { giftLunch, redeemLunch };
