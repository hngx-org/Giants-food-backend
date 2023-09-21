const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');

const { lunchService } = require('../services');

const giftLunch = Asyncly(async (req, res) => {
    if(req.user.id == req.body.receiver_id){
        return res.status(httpStatus.FORBIDDEN).json({ Message: "You cannot gift yourself a lunch" });
    }
    const lunch = await lunchService.createLunch({ sender_id: req.user.id, ...req.body });
    return res.status(httpStatus.CREATED).json({ Message: "Lunch gifted successfully" });
});

const redeemLunch = Asyncly(async (req, res, next) => {
	const { id } = req.params;
	const lunch = await lunchService.redeemLunch({ id });
	return res.status(httpStatus.OK).json({ lunch });
});

module.exports = { giftLunch, redeemLunch };
