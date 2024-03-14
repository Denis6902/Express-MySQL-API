const {addLog} = require("../logger");
const jwt = require("jsonwebtoken");
const {getUserByToken} = require("../User");
const {getService, getUser, returnResponse} = require("../Database/databaseController");
const cookieParser = require("cookie-parser");
const express = require("express");

const jwtMiddleware = async (req, res, next, cookies) => {
    // use login can be done by anyone
    if (req.path === '/login') {
        addLog('Login request | middleware / index.js');
        next();
        return;
    }

    // POST user can be done by anyone
    if (req.path === '/user' && req.method === 'POST') {
        addLog('User request POST | middleware / index.js');
        next();
        return;
    }

    // POST customer can be done by anyone
    if (req.path === '/customer' && req.method === 'POST') {
        addLog('Customer request POST | middleware / index.js');
        next();
        return;
    }

    addLog('Request received in middleware ' + req.url + ' ' + req.method);

    try {
        // get the token from the cookie
        const token = cookies.token;

        // if there is no token, return an error
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // if not error go next
        addLog('User verified | middleware / index.js');
    } catch (e) {
        // if there is an error, return an error
        addLog('Invalid token | middleware / index.js');

        // clear the cookie
        res.clearCookie('token');

        // return an error
        res.status(401);
        return res.json(returnResponse('Invalid token', null, 401));
    }


    // service request
    if (req.path.includes('/service/')) {
        return servicePath(req, res, next, cookies);
    }

    // customer request
    if (req.path.includes('/customer/')) {
        return customerPath(req, res, next, cookies);
    }

    // user request
    if (req.path.includes('/user/')) {
        return userPath(req, res, next, cookies);
    }

    next();
}

// customer path
const customerPath = async (req, res, next, cookies) => {
    addLog('Customer request | middleware / index.js')

    // get the user from the token
    addLog('Getting user by token | middleware / index.js')
    const userResult = await getUserByToken(cookies.token);

    if (userResult.status !== 200) {
        addLog('User not found | middleware / index.js')
        res.status(404);
        return res.json(returnResponse('User not found', null, 404));
    }

    const user = userResult.data;

    // if the user is admin, let the request through every time
    if (user.role_id === 1) {
        addLog('User is admin | middleware / index.js')
        next();
        return;
    }

    if (user.role_id === 2) {
        addLog('User is customer | middleware / index.js')

        // check if the user is the owner of the customer
        const customerId = req.path.split('/')[2];
        const customerResponse = (await getUser(customerId));

        if (customerResponse.status !== 200) {
            addLog('Customer not found | middleware / index.js')
            res.status(404);
            return res.json(returnResponse('Customer not found', null, 404));
        }

        const customer = customerResponse.data;

        if (customer.id === user.customer_id) {
            addLog('User is owner of customer | middleware / index.js')
            next();
            return;
        }

        // if the user is not the owner of the customer, return an error
        addLog('User is not owner of customer | middleware / index.js')
        res.status(401);
        return res.json(returnResponse('Unauthorized', null, 401));
    }
}

// service path
const servicePath = async (req, res, next, cookies) => {
    addLog('Service request | middleware / index.js');

    // get the user from the token
    addLog('Getting user by token | middleware / index.js')
    const user = (await getUserByToken(cookies.token)).data;

    // if the user is admin, let the request through every time
    if (user.role_id === 1) {
        addLog('User is admin | middleware / index.js')
        next();
        return;
    }

    if (user.role_id === 2) {
        addLog('User is customer | middleware / index.js')

        // check if the user is the owner of the service
        const serviceId = req.path.split('/')[2];
        const serviceResponse = (await getService(serviceId));

        if (serviceResponse.status !== 200) {
            addLog('Service not found | middleware / index.js')
            res.status(404);
            return res.json(returnResponse('Service not found', null, 404));
        }

        const service = serviceResponse.data;

        if (service.customer_id === user.customer_id) {
            addLog('User is owner of service | middleware / index.js')
            next();
            return;
        }

        // if the user is not the owner of the service, return an error
        addLog('User is not owner of service | middleware / index.js')
        res.status(401);
        return res.json(returnResponse('Unauthorized', null, 401));
    }
}

// user path
const userPath = async (req, res, next, cookies) => {
    addLog('User request | middleware / index.js');

    // get the user from the token
    addLog('Getting user by token | middleware / index.js')
    const userResult = await getUserByToken(cookies.token)

    if (userResult.status !== 200) {
        addLog('User not found | middleware / index.js')
        res.status(404);
        return res.json(returnResponse('User not found', null, 404));
    }

    const user = userResult.data;

    // if the user is admin, let the request through every time
    if (user.role_id === 1) {
        addLog('User is admin | middleware / index.js')
        next();
        return;
    }

    if (user.role_id === 2) {
        addLog('User is customer | middleware / index.js')

        // check if the user is the owner of the user
        const userId = req.path.split('/')[2];

        if (userId === user.id) {
            addLog('User is owner of user | middleware / index.js')
            next();
            return;
        }

        // if the user is not the owner of the user, return an error
        addLog('User is not owner of user | middleware / index.js')
        res.status(401);
        return res.json(returnResponse('Unauthorized', null, 401));
    }
}

module.exports = {
    jwtMiddleware
};