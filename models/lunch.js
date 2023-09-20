module.exports = (sequelize, dataType) => {
	const lunch = sequelize.define('lunch', {
		sender_id: {
			type: dataType.STRING,
			allowNull: false,
		},
		receiver_id: {
			type: dataType.INTEGER,
			allowNull: false,
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
			allowNull: false,
		},
		redeemed: {
			type: dataType.BOOLEAN,
		},
	}, {
		timestamps: true,
		createdAt: "created_at",
		updatedAt: false,
	});

	return lunch;
};