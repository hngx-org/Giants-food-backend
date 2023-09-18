const express = require('express');
const authRoute = require('./auth.route');
const config = require('../config/auth')

const router = express.Router();

const defaultRoutes = [
    {
      path: '/auth',
      route: authRoute,
    },
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

if (config.env == "development") {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}


module.exports = router;