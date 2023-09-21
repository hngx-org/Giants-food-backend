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
	// {
	// 	path: '/auth',
	// 	route: authRoute,
	// },
	// {
	// 	path: '/bank-account',
	// 	route: bankAccountRoute,
	// },{
	// 	path: '/lunch',
	// 	route: lunchRoute,
	// },{
	// 	path: '/organization',
	// 	route: organizationRoute,
	// },
	{
		path: '/user',
		route: userRoute,
	},
	// {
	// 	path: '/withdrawal',
	// 	route: withdrawalRoute,
	// },
];

const devRoutes = [
	{
		path: '/dev',
		route: authRoute,
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
