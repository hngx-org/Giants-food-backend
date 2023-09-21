module.exports = (sequelize, dataType) => {
	const withdrawal = sequelize.define(
		'withdrawal',
		{
			user_id: {
				type: dataType.STRING,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
			},
			status: {
				type: dataType.STRING,
				allowNull: false,
			},
			amount: {
				type: dataType.INTEGER,
				allowNull: false,
			},
		},
	);

	return withdrawal;
};
