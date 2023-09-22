const express = require('express');
const config = require('../config/auth');
const authRoute = require('./auth.route');
const bankAccountRoute = require('./bankAccount.route');
const lunchRoute = require('./lunch.route');
const organizationRoute = require('./organization.route');
const userRoute = require('./user.route');
const withdrawalRoute = require('./withdrawal.route');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: authRoute,
	},
	// {
	// 	path: '/bank-account',
	// 	route: bankAccountRoute,
	// },
    {
		path: '/lunches',
		route: lunchRoute,
	},
    {
		path: '/organizations',
		route: organizationRoute,
	},
    // {
	// 	path: '/user',
	// 	route: userRoute,
	// },
    // {
	// 	path: '/withdrawal',
	// 	route: withdrawalRoute,
	// },
	{
		path: '/users',
		route: userRoute,
	},
	{
		path: '/organizations',
		route: organizationRoute,
	},
	{
		path: '/withdrawals',
		route: withdrawalRoute,
	},
];

const devRoutes = [
	{
		path: '/dev',
		route: authRoute,
	},
	{
		path: '/organizations',
		route: organizationRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

if (config.env == 'development') {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;
