const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { lunchService } = require('../services');

const giftLunch = Asyncly(async (req, res, next) => {
    const { receiver, quantity, note } = req.body;
    try {
        const sender = req.user.id;
        const lunch = await lunchService.giftLunch({ sender, receiver, quantity, note });
        return res.status(httpStatus.CREATED).json({ lunch });
    }
    catch (error) {
        return next(error);
    }
});

const redeemLunch = Asyncly(async (req, res, next) => {
    const { id } = req.params;
    try {
        const lunch = await lunchService.redeemLunch({ id });
        return res.status(httpStatus.OK).json({ lunch });
    }
    catch (error) {
        return next(error);
    }
});


module.exports = { giftLunch, redeemLunch};









