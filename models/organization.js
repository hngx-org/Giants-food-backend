module.exports = (sequelize, dataType) => {
	const organization = sequelize.define(
		'organization',
		{
			name: {
				type: dataType.STRING,
				allowNull: false,
			},
			lunch_price: {
				type: dataType.INTEGER,
				allowNull: false,
			},
			currency_code: {
				type: dataType.STRING,
				defaultValue: 'NGN',
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);

	return organization;
};
