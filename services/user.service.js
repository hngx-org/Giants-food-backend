const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const isEmailTaken = async (email) => {
	const person = await dB.users.findOne({where: { email }});
	return !!person;
};

const createUser = async (userBody) => {
	if (await isEmailTaken(userBody.email)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
	}

	userBody.password_hash = bcrypt.hashSync(userBody.password_hash, 10);
	const user = await dB.users.create(userBody);
	if (!user) {
		throw new ApiError(httpStatus.BAD_GATEWAY, 'problem with account creation');
	}
	return user;
};


const makeAdmin = async (userInstance, org_id) => {
    const user = await getUserById(userInstance.id)
    user.is_admin = 1
    user.org_id = org_id
    return await user.save()
}

const isPasswordMatch = async function (password_hash, user) {
	const comp = bcrypt.compareSync(password_hash, user.password_hash);
	return comp;
};

const getUserById = async (id) => {

	const person = await dB.users.findOne({where: { id }})

	return person;
};

const getUserByEmail = async (email) => {
	const person = dB.users.findOne({where: { email }})
	return person;
};

const getPeopleByOrgId = async (org_id) => {
	const people = await dB.users.findAll({
		where: {
			org_id: org_id.org_id,
		}
	})
	return people;
}

const updateUserById = async (userId, updateBody, exclude) => {
	const person = await getPersonById(userId, undefined); //|| getPersonByEmail(userId, undefined);git
	if (!person) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
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

const deleteUserById = async (userId, exclude) => {
	// const person = await getPersonById(userId, undefined) || getPersonByEmail(userId, undefined);
	const person = await dB.people.findByIdAndDelete(userId);
	if (!person) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
	}
	console.log(person, 'Delete person');
	// person.deleteOne()
	return person;
};

const queryPersons = async (limit, page, where, include = [], exclude = []) => {
	page = page || 1;
	limit = limit || 50;
	const personsCount = await dB.people.estimatedDocumentCount(where);
	const persons = await dB.people
		.find(where)
		.skip((page - 1) * limit)
		.limit(limit)
		.select([include.join(' '), exclude.join(' -')].join(' '));
	const count = persons.length;
	const totalPages = Math.round(personsCount / count) || 0;
	return {
		persons,
		total: personsCount,
		page,
		count,
		totalPages,
	};
};


module.exports = {
	getPeopleByOrgId,
	isEmailTaken,
	createUser,
	queryPersons,
	getUserByEmail,
	getUserById,
	updateUserById,
	deleteUserById,
	makeAdmin,
	isPasswordMatch,
};
