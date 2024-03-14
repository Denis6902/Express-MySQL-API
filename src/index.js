require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const {customerCreation, customerDeletion, customerUpdate, customerGet} = require('./Customer');
const {serviceCreation, serviceDeletion, serviceUpdate, serviceGet} = require('./Service');
const {userCreation, userDeletion, userUpdate, userGet, loggedUser} = require('./User');
const {addLog} = require('./logger');
const {login} = require("./loginController");
const {jwtMiddleware} = require("./Middleware");

// start the server
app.listen(port, () => {
    addLog('Server started');
    console.log(`Example app running at http://localhost:${port}`);
});

// root route
app.get('/', (req, res) => {
    addLog('Root route')
    res.send('Hello World!');
});

app.use(cookieParser());

// middleware
app.use((req, res, next) => jwtMiddleware(req, res, next, req.cookies));

// add
app.post('/customer/', customerCreation);
app.post('/service/', serviceCreation);
app.post('/user/', userCreation);

// login
app.post('/login', (req, res) => login(res, req));

// delete
app.delete('/customer/:id', customerDeletion);
app.delete('/service/:id', serviceDeletion);
app.delete('/user/:id', userDeletion);

// update
app.put('/customer/:id', customerUpdate);
app.put('/service/:id', serviceUpdate);
app.put('/user/:id', userUpdate);

// get
app.get('/customer/:id', customerGet);
app.get('/service/:id', serviceGet);
app.get('/user/:id', userGet);

// get logged user
app.get('/logged_user', async (req, res) => loggedUser(req, res));




