const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs')

const isEmailTaken = async function (email) {
	const person = await dB.users.findOne({ email });
	return !!person;
};

const createUser = async (userBody) => {
    userBody.password_hash = bcrypt.hashSync(userBody.password, 10)
	return dB.users.create(userBody);
};

const makeAdmin = async () => {
    const user = await getUserById(id)
    user.is_admin = 1
    return user.save()
}

// const queryUsers = async (limit, page, where, include = [], exclude = []) => {
// 	page = page || 1;
// 	limit = limit || 50;
// 	const personsCount = await dB.users.estimatedDocumentCount(where);
// 	const persons = await dB.users
// 		.findOne(where)
// 		.skip((page - 1) * limit)
// 		.limit(limit)
// 		.select([include.join(' '), exclude.join(' -')].join(' '));
// 	const count = persons.length;
// 	const totalPages = Math.round(personsCount / count) || 0;
// 	return {
// 		persons,
// 		total: personsCount,
// 		page,
// 		count,
// 		totalPages,
// 	};
// };

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

module.exports = {
	isEmailTaken,
	createUser,
	// queryUsers,
	getUserByEmail,
	getUserById,
	updateUserById,
	deleteUserById,
    makeAdmin,
    isPasswordMatch,
};
