const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

const isEmailTaken = async function (email) {
	const person = await dB.people.findOne({ email });
	return !!person;
};

const createPerson = async (userBody) => {
	return dB.people.create(userBody);
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

const getPersonById = async (id, include = [], exclude = []) => {
	const person = await dB.people
		.findOne({ _id: id })
		.select([include.join(' '), exclude.join(' -')].join(' '));

	return person;
};

const getPersonByEmail = async (name, include = [], exclude = []) => {
	const person = dB.people
		.find({ name })
		.select([include.join(' '), exclude.join(' -')].join(' '));

	return person;
};

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

const deletePersonById = async (userId, exclude) => {
	// const person = await getPersonById(userId, undefined) || getPersonByEmail(userId, undefined);
	const person = await dB.people.findByIdAndDelete(userId);
	if (!person) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
	}
	console.log(person, 'Delete person');
	// person.deleteOne()
	return person;
};

module.exports = {
	isEmailTaken,
	createPerson,
	queryPersons,
	getPersonByEmail,
	getPersonById,
	updateUserById,
	deletePersonById,
};
