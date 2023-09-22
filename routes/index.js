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
<<<<<<< HEAD
	// {
	// 	path: '/bank-account',
	// 	route: bankAccountRoute,
	// },
=======
	{
		path: '/bank-account',
		route: bankAccountRoute,
	},
>>>>>>> b0f6664b77d8eb3aa3fbb8055e8a95f71ebf21c4
    {
		path: '/lunches',
		route: lunchRoute,
	},
<<<<<<< HEAD
    // {
	// 	path: '/organizations',
	// 	route: organizationRoute,
	// },
    // {
	// 	path: '/users',
	// 	route: userRoute,
	// },
    // {
	// 	path: '/withdrawals',
	// 	route: withdrawalRoute,
	// },
=======
    {
		path: '/organizations',
		route: organizationRoute,
	},
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
>>>>>>> b0f6664b77d8eb3aa3fbb8055e8a95f71ebf21c4
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
