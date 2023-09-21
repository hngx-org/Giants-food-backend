const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const ApiError = require('../utils/ApiError');

const { lunchService } = require('../services');

const giftLunch = Asyncly(async (req, res) => {
	console.log(req.user.id)
    if(req.user.id == req.body.receiver_id){
		throw new ApiError(httpStatus.FORBIDDEN, 'You cannot gift yourself a lunch');
    }
    const lunch = await lunchService.createLunch({ sender_id: req.user.id, org_id:req.user.org_id, ...req.body });
    return res.status(httpStatus.CREATED).json({ Message: "Lunch gifted successfully" });
});


module.exports = { giftLunch };
