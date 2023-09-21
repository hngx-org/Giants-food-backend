const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs')

const isEmailTaken = async (email) => {
	const person = await dB.users.findOne({ email });
	return !!person;
};

const createUser = async (userBody) => {
    if(await isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }

    userBody.password_hash = bcrypt.hashSync(userBody.password_hash, 10)
	const user = await dB.users.create(userBody);
    if(!user) {
        throw new ApiError(httpStatus.BAD_GATEWAY, 'problem with account creation');
    }
    return user;
};

const makeAdmin = async (id, org_id) => {
    const user = await getUserById(id)
    user.is_admin = 1
    user.org_id = org_id
    return user.save()
}

const isPasswordMatch = async function (password_hash, user) {
    const comp = bcrypt.compareSync(password_hash, user.password_hash);
    return comp;
  };

const getUserById = async (id) => {
	const person = await dB.users.findOne({ id})
	return person;
};

const getUserByEmail = async (email) => {
	const person = dB.users.findOne({ email })

	return person;
};

const updateUserById = async (userId, updateBody) => {
	const person = await getUserById(userId, undefined); //|| getUserByEmail(userId, undefined);git
	if (!person) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}
	await Object.assign(person, updateBody);
	await person.save();
	return {
		...person._doc,
		createdAt: undefined,
		updatedAt: undefined,
		__v: undefined,
	};
};

const deleteUserById = async (userId) => {
	// const person = await getPersonById(userId, undefined) || getPersonByEmail(userId, undefined);
	const person = await dB.users.findByIdAndDelete(userId);
	if (!person) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
	}
	console.log(person, 'Delete user');
	// person.deleteOne()
	return person;
};
const getUsersByOrgID = async (orgId) => {

	const persons = await dB.users.findAll({where: {org_id: orgId}});	
	return persons;
};

module.exports = {
	isEmailTaken,
	createUser,
	getUsersByOrgID,
	getUserByEmail,
	getUserById,
	updateUserById,
	deleteUserById,
    makeAdmin,
    isPasswordMatch,
};
