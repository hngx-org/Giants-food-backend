module.exports = (sequelize, dataType) => {
	const lunch = sequelize.define('lunch', {
		sender_id: {
			type: dataType.STRING,
			allowNull: false,
			references: {
				model: user,
				key: "id",
			},
		},
		receiver_id: {
			type: dataType.STRING,
			allowNull: false,
			references: {
				model: user,
				key: "id",
			},
		},
		quantity: {
			type: dataType.ENUM(
				1,
				2,
				3,
				4,
			),
			allowNull: false,
		},
		note: {
			type: dataType.STRING,
			allowNull: true,
		},
		redeemed: {
			type: dataType.BOOLEAN,
			defaultValue: 0,
		},
	}, {
		timestamps: true,
		createdAt: "created_at",
		updatedAt: false,
	});

	return lunch;
};