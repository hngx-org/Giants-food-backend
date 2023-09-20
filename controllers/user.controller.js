const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

const getUserByIdOrEmail = Asyncly(async (req, res, next) => {
    const { key } = req.params;

    let user = await userService.getPersonById({ key });

    if (!user) {
        user = await userService.getPersonByEmail({ key });
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
    }

    const response = {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        Profile_picture: user.Profile_picture,
        email: user.email,
        id: user.id,
    };

    return res.status(httpStatus.OK).json(response);
});

module.exports = { getUserByIdOrEmail };
