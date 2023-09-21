module.exports = (sequelize, dataType) => {
	const lunch = sequelize.define(
		'lunches',
		{
			sender_id: {
				type: dataType.STRING,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
			},
			receiver_id: {
				type: dataType.STRING,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
			},
			quantity: {
				type: dataType.ENUM('1', '2', '3', '4'),
				allowNull: false,
			},
			note: {
				type: dataType.STRING,
				allowNull: true,
			},
			redeemed: {
				type: dataType.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			org_id: {
				type: dataType.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: false,
			freezeTableName: true,
		},
<<<<<<< HEAD
		quantity: {
			type: dataType.ENUM(
				"1",
				"2",
				"3",
				"4",
			),
			allowNull: false,
		},
		note: {
			type: dataType.STRING,
			allowNull: true,
		},
		redeemed: {
			type: dataType.BOOLEAN,
			allowNull: false,
			defaultValue: 0,
		},
		org_id: { 
			type: dataType.STRING,
			allowNull: false,
			// references: {
			// 	model: "organizations",
			// 	key: "id",
			// }
		},
	}, {
		timestamps: true,
		createdAt: "created_at",
		updatedAt: false,
        freezeTableName: true,
	});
=======
	);
>>>>>>> 6b5f091ec51f02ee8709c4f7e4dae4de86524265

	return lunch;
};
