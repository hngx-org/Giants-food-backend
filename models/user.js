const validator = require('validator');

module.exports = (sequelize, dataType) => {
	const user = sequelize.define(
		'user',
		{
			org_id: {
				type: dataType.STRING,
				allowNull: false,
				// references: {
				// 	model: "organizations",
				// 	key: "id",
				// },
			},
			id: {
				type: dataType.STRING,
				defaultValue: dataType.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			first_name: {
				type: dataType.STRING,
				allowNull: false,
				trim: true,
			},
			last_name: {
				type: dataType.STRING,
				allowNull: false,
				trim: true,
			},
			email: {
				type: dataType.STRING,
				allowNull: false,
				unique: true,
				trim: true,
				lowercase: true,
				validate(value) {
					if (!validator.isEmail(value)) {
						throw new Error('Invalid email');
					}
				},
			},
			profile_picture: {
				type: dataType.STRING,
				allowNull: true,
				minlength: 15,
			},
			phone_number: {
				type: dataType.STRING,
				allowNull: true,
				minlength: 11,
			},
			password_hash: {
				type: dataType.STRING,
				allowNull: false,
				trim: true,
				minlength: 8,
				validate(value) {
					if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
						throw new Error(
							'Password must contain at least one letter and one number',
						);
					}
				},
			},
			is_admin: {
				type: dataType.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			refresh_token: {
				type: dataType.STRING,
			},
			lunch_credit_balance: {
				type: dataType.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			bank_number: {
				type: dataType.STRING,
			},
			bank_code: {
				type: dataType.STRING,
			},
			bank_name: {
				type: dataType.STRING,
			},
		},
		{
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	);

	return user;
};
