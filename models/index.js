const Sequelize = require('sequelize');
const { sequelize } = require('../config/auth');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const dB = {};

sequelizeInstance
	.authenticate()
	.then(() => {
		logger.info('Database is good');
	})
	.catch((err) => {
		logger.error('Database no dey work', err);
	});

dB.Sequelize = Sequelize;
dB.sequelize = sequelizeInstance;

dB.users = require('./user')(sequelizeInstance, Sequelize);
dB.tokens = require('./token')(sequelizeInstance, Sequelize);

// method

dB.users.paginate = async (limit, page, where, include, exclude) => {
	let offset = page <= 0 ? 0 : (page - 1) * limit;

	const result = await dB.users.findAndCountAll({
		attributes: { include, exclude },
		limit,
		offset,
		where,
	});

	let userObj = {};
	let totalPages = Math.ceil(result.count / limit);
	userObj.dataCount = result.count;
	userObj.page = page <= 0 ? 1 : page;
	userObj.totalPages = totalPages;
	userObj.userData = result.rows;

	return userObj;
};

//Relationships

module.exports = {
	dB,
};

const mongoose = require('mongoose');
const { sequelize } = require('../config');

const mongooseInstance = mongoose.connect(sequelize.url);
const dB = {};

mongooseInstance
	.then(async () => {
		console.info('Database is good');
	})
	.catch((err) => {
		console.error('Database no dey work', err);
	});

dB.mongo = mongooseInstance;

dB.people = mongoose.model('Person', require('./user'));

module.exports = {
	dB,
};
