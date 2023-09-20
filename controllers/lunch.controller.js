const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService } = require('../services');

const giftLunch = Asyncly(async (req, res) => {
  const { receiver, quantity, note } = req.body;
  const sender = req.user.id;
  const lunch = await authService.giftLunch({ sender, receiver, quantity, note });
  return res.status(httpStatus.CREATED).json({ lunch });
});

const redeemLunch = Asyncly(async (req, res) => {
    const { id } = req.params;
    const lunch = await authService.redeemLunch({ id });
    return res.status(httpStatus.OK).json({ lunch });
});
module.exports = { giftLunch, redeemLunch};










