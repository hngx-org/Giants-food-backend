const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');

const { lunchService } = require('../services');

const giftLunch = Asyncly(async (req, res) => {
    const { receiver, quantity, note } = req.body;
    const sender = req.user.id;
    const lunch = await lunchService.giftLunch({ sender, receiver, quantity, note });
        return res.status(httpStatus.CREATED).json({ lunch });
});

const redeemLunch = Asyncly(async (req, res, next) => {
    const { id } = req.params;
    const lunch = await lunchService.redeemLunch({ id });
    return res.status(httpStatus.OK).json({ lunch });
});


<<<<<<< HEAD
module.exports = { giftLunch, redeemLunch};
=======
module.exports = { giftLunch, redeemLunch};









>>>>>>> 116313dce5419372fff01a9881beaa101bfca30f
>>>>>>> 6b5f091ec51f02ee8709c4f7e4dae4de86524265
