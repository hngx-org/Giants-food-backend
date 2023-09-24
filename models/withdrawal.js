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
				type: dataType.ENUM('success', 'pending'),
				allowNull: true,
			},
			amount: {
				type: dataType.DECIMAL(10, 2),
				allowNull: false,
			},
		},
		{
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: false,
		},
	);

	return withdrawal;
};
