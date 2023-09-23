module.exports = (sequelize, dataType) => {
	const organization = sequelize.define(
		'organization',
		{
			name: {
				type: dataType.STRING,
				allowNull: false,
			},
			lunch_price: {
				type: dataType.DECIMAL(10, 2),
				allowNull: false,
			},
			currency_code: {
				type: dataType.STRING(4),
				defaultValue: 'NGN',
				allowNull: false,
			},
			is_deleted: {
				type: dataType.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			}
		},
		{
			timestamps: false,
		},
	);

	return organization;
};
