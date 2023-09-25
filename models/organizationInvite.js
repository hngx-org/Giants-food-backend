module.exports = (sequelize, dataType) => {
	const organization_invite = sequelize.define(
		'organization_invites',
		{
			email: {
				type: dataType.STRING,
				allowNull: false,
			},
			token: {
				type: dataType.STRING,
				allowNull: false,
			},
			ttl: {
				type: dataType.DATE,
				defaultValue: dataType.NOW,
			},
			org_id: {
				type: dataType.STRING,
			}
		},
		{
			freezeTableName: true,
			timestamps: false,
		},
	);

	return organization_invite;
};
