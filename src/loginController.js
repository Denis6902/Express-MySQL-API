const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const {findUserByEmail, getUser, returnResponse} = require("./Database/databaseController");
const {addLog} = require("./logger");
const {addRoleAndCustomer} = require("./User");

const login = async (res, req) => {
    // get the query parameters
    let {email, password} = req.query;

    // try find email and password in database
    const {data} = await findUserByEmail(email);

    // if email not found
    if (data === null) {
        addLog('Invalid email | login / loginController.js')
        res.status(401)
        return res.json(returnResponse('Invalid email or password', null, 401))
    }

    // if password is incorrect
    if (await argon2.verify(data.password, password) === false) {
        addLog('Invalid password | login / loginController.js')

        // return an error
        res.status(401)
        return res.json(returnResponse('Invalid email or password', null, 401))
    }


    // create a token
    const token = jwt.sign({id: data.id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    // set the token in a cookie
    res.cookie('token', token, {httpOnly: true});

    // return the user data
    addLog('User logged in | login / loginController.js')

    // get the user from the database
    let user = (await getUser(data.id)).data;

    // get the role from the id
    user = await addRoleAndCustomer(user);

    res.status(200)
    return res.json(returnResponse('Logged in', user, 200))
}


module.exports = {
    login
}