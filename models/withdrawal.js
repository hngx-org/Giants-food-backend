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
<<<<<<< HEAD
		{
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: false,
=======
		status: {
			type: dataType.STRING,
			allowNull: true,
>>>>>>> origin/development
		},
	);

	return withdrawal;
};
