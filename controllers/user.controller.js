const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

<<<<<<< HEAD
const getUserById = Asyncly(async (req, res) => {
	const { id } = req.params;
	const user = await userService.getPersonById({ id });
	return res.status(httpStatus.OK).json({ user });
});

const getUserByEmail = Asyncly(async (req, res) => {
	const { email } = req.params;
	const user = await userService.getPersonByEmail({ email });
	return res.status(httpStatus.OK).json({ user });
});

module.exports = { getUserById, getUserByEmail };
=======
const getUserByIdOrEmail = Asyncly(async (req, res) => {
    const { key } = req.params;

    let user = await userService.getUserById( key );

    if (!user) {
        user = await userService.getUserByEmail( key );
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
>>>>>>> origin/development
