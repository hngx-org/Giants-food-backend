const Sequelize = require('sequelize');
const { sequelize } = require('../config/auth');
const logger = require('../config/logger');

// const sequelizeInstance = new Sequelize(sequelize.url);
const sequelizeInstance = new Sequelize(sequelize.database, sequelize.user, sequelize.password, {
	host: sequelize.host,
	dialect: 'mysql'
});
// const devInstance = new Sequelize(sequelize.url);
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

dB.organizations = require('./organization')(sequelizeInstance, Sequelize);
dB.organizationInvites = require('./organizationInvite')(
	sequelizeInstance,
	Sequelize,
);
dB.users = require('./user')(sequelizeInstance, Sequelize);
// dB.tokens = require('./token')(sequelizeInstance, Sequelize);
dB.withdrawals = require('./withdrawal')(sequelizeInstance, Sequelize);
dB.lunches = require('./lunch')(sequelizeInstance, Sequelize);

// association

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
