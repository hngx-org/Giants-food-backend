module.exports = (sequelize, dataType) => {
	const organization_invite = sequelize.define('organization_invites', {
		email: {
			type: dataType.STRING,
			allowNull: false,
		},
		token: {
			type: dataType.STRING,
			allowNull: false,
		},
		TTL: {
			type: dataType.DATE,
		},
	}, {
        freezeTableName: true,
        timestamps: false,
    });

	return organization_invite;
};