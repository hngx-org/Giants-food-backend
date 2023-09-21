module.exports = (sequelize, dataType) => {
	const withdrawal = sequelize.define('withdrawal', {
		user_id: {
			type: dataType.STRING,
			allowNull: false,
			references: {
				model: "users",
				key: "id",
			},
		},
		status: {
			type: dataType.STRING,
			allowNull: true,
		},
		amount: {
			type: dataType.INTEGER,
			allowNull: false,
		},
	}, {
		timestamps: true,
		createdAt: "created_at",
		updatedAt: false,
	});

	return withdrawal;
};