const {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getCustomer,
    returnResponse
} = require("../Database/databaseController");
const argon2 = require('argon2');
const {addLog} = require("../logger");
const jwt = require("jsonwebtoken");

// Create a new user
const userCreation = async (req, res) => {
    // get the query parameters
    let {email, password, customer_id, role} = req.query;

    // hash the password
    password = await argon2.hash(password);

    // get the role id
    const role_id = getRoleId(role);

    // call the createUser function and wait for the result
    const userResultJson = await createUser(email, password, customer_id, role_id)

    if (userResultJson.status === 201) {
        // get the role customer object
        userResultJson.data = await addRoleAndCustomer(userResultJson.data);
    }

    // set the status and send the result
    res.status(userResultJson.status)
    res.json(userResultJson)
}

// Delete a user
const userDeletion = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // call the deleteUser function and wait for the result
    const userResultJson = await deleteUser(id);

    // set the status and send the result
    res.status(userResultJson.status)
    res.json(userResultJson)
}

// Update a user
const userUpdate = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // get the query parameters
    let {email, password, customer_id, role} = req.query;

    // hash the password
    password = await argon2.hash(password);

    // get the role id
    const role_id = getRoleId(role);

    // call the updateUser function and wait for the result
    const userResultJson = await updateUser(id, email, password, customer_id, role_id);

    if (userResultJson.status === 200) {
        // get the role customer object
        userResultJson.data = await addRoleAndCustomer(userResultJson.data);
    }

    // set the status and send the result
    res.status(userResultJson.status)
    res.json(userResultJson)
}

const userGet = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // call the getUser function and wait for the result
    const userResultJson = await getUser(id);

    if (userResultJson.status === 200) {
        // get the role customer object
        userResultJson.data = await addRoleAndCustomer(userResultJson.data);
    }

    // set the status and send the result
    res.status(userResultJson.status)
    res.json(userResultJson)
}

// Get the logged user
const loggedUser = async (req, res) => {
    // get the user from the token
    addLog('Get logged user request | index.js')
    let user = (await getUserByToken(req.cookies.token)).data;

    // if user not found return an error
    if (!user) {
        addLog('User not found | index.js')
        res.status(404);
        return res.json(returnResponse('Logged user not found', null, 404))
    }

// get the role customer object
    user = await addRoleAndCustomer(user);

    res.json(returnResponse('Logged user found', user, 200))
}

// Get a user by token
const getUserByToken = async (token) => {
    // get the user from the token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // call the getUser function and wait for the result
    return await getUser(user.id);
};

// Get the role id
const getRoleId = (role) => {
    // if the role is not set, set it to user
    let role_id;

    switch (role) {
        case 'admin':
            role_id = 1;
            break;
        case 'user':
            role_id = 2;
            break;
        default:
            role_id = 2;
            break;
    }

    return role_id;
}

// Get the role from the id
const getRoleFromId = (id) => {
    // if the role is not set, set it to user

    let role;

    switch (id) {
        case 1:
            role = 'admin';
            break;
        case 2:
            role = 'user';
            break;
        default:
            role = 'user';
            break;
    }

    return role;
}

// Add the role and customer to the user object
const addRoleAndCustomer = async (user) => {
    // get the role from the id and hide the role_id
    user.role = getRoleFromId(user.role_id);
    user.role_id = undefined;

    // get customer object
    user.customer = (await getCustomer(user.customer_id)).data;
    user.customer_id = undefined;

    return user;
}

module.exports = {
    userCreation,
    userDeletion,
    userUpdate,
    userGet,
    loggedUser,
    getUserByToken,
    getRoleId,
    getRoleFromId,
    addRoleAndCustomer
}
