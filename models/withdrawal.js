module.exports = (sequelize, dataType) => {
	const withdrawal = sequelize.define('withdrawal', {
		user_id: {
			type: dataType.STRING,
			allowNull: false,
		},
		status: {
			type: dataType.INTEGER,
			allowNull: false,
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