module.exports = (sequelize, dataType) => {
	const organization = sequelize.define('organization', {
		name: {
			type: dataType.STRING,
			allowNull: false,
		},
		lunch_price: {
			type: dataType.STRING,
			allowNull: false,
		},
		currency: {
			type: dataType.STRING,
            defaultValue: "NGN",
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

	return organization;
};