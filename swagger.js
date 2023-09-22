const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Free Lunch API',
			version: '1.0.0',
			description: 'Free Lunch API',
		},
		servers: [
			{
				url: 'http://localhost:3001',
				description: 'Development server',
			},
		],
		components: {
			schemas: {
				Organization: {
					type: 'object',
					required: ['name', 'lunch_price'],
					properties: {
						name: {
							type: 'string',
						},
						lunch_price: {
							type: 'string',
						},
						currency: {
							type: 'string',
						},
					},
				},
				Withdrawal: {
					type: 'object',
					properties: {
						user_id: {
							type: 'string',
						},
						status: {
							type: 'string',
						},
						amount: {
							type: 'integer',
						},
					},
				},
				Lunch: {
					type: 'object',
					properties: {
						sender_id: {
							type: 'string',
						},
						receiver_id: {
							type: 'string',
						},
						quantity: {
							type: 'string',
							enum: ['-1', '2', '3', '4'],
						},
						note: {
							type: 'string',
						},
						redeemed: {
							type: 'boolean',
						},
						org_id: {
							type: 'string',
						},
					},
				},
				User: {
					type: 'object',
					properties: {
						org_id: {
							type: 'string',
						},
						first_name: {
							type: 'string',
						},
						last_name: {
							type: 'string',
						},
						email: {
							type: 'string',
						},
						profile_picture: {
							type: 'string',
						},
						phone_number: {
							type: 'string',
						},
						password_hash: {
							type: 'string',
						},
						is_admin: {
							type: 'boolean',
						},
						refresh_token: {
							type: 'string',
						},
						launch_credit_balance: {
							type: 'string',
						},
						bank_number: {
							type: 'string',
						},
						bank_code: {
							type: 'string',
						},
						bank_name: {
							type: 'string',
						},
					},
				},
				OrganizationInvite: {
					type: 'object',
					properties: {
						email: {
							type: 'string',
						},
						token: {
							type: 'string',
						},
						TTL: {
							type: 'date',
						},
					},
				},
			},
		},
		responses: {
			401: {
				description: 'Unauthorized error',
				contents: 'application/json',
			},
			502: {
				description: ' Bad Gateway server error',
				contents: 'application/json',
			},
			409: {
				description: 'Confict Error',
				contents: 'application/json',
			},
		},
	},
	apis: ['./routes/*.js'],
};

module.exports = options;
