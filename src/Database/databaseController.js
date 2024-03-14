const mysql2 = require("mysql2/promise");
const {addLog} = require('../logger');

// database connection
const dbConnection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

// Insert new customer into the database
const createCustomer = async (first_name, last_name, phone) => {
    // check parameters are provided
    if (!first_name || !last_name || !phone) {
        addLog('First name, last name and phone are required | createCustomer / databaseController.js')
        return returnResponse('First name, last name, email and phone are required', null, 400)
    }

    // try find phone in database
    const customerByPhone = await findCustomerByPhone(phone);

    // check if phone already exists
    if (customerByPhone.status !== 404) {
        addLog('Phone already exists | createCustomer / databaseController.js')
        return returnResponse('Phone already exists', null, 400)
    }

    // insert the customer into the database
    addLog('INSERT Customer Query  | createCustomer / databaseController.js')

    const result = (await (await dbConnection)
        .query(`INSERT INTO customer (first_name, last_name, phone)
                VALUES ('${first_name}', '${last_name}', '${phone}')`))


    // return the response
    return returnResponse('Customer created', {
        first_name, last_name, phone
    }, 201)
}

// Delete customer from the database
const deleteCustomer = async (id) => {
    // check parameters are provided
    if (!id) {
        addLog('Id is required | deleteCustomer / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    // get the customer from the database
    const userByCustomerId = await findUserByCustomerId(id);

    // check if user has customer
    if (userByCustomerId.status !== 404) {
        addLog('User has customer | deleteCustomer / databaseController.js')

        // delete the user from the database
        addLog('DELETE User query | deleteCustomer / databaseController.js')
        const result = (await (await dbConnection).query(`DELETE
                                                          FROM user
                                                          WHERE customer_id = ${id}`))

        // check if the user was deleted
        if (result[0].affectedRows === 0) {
            addLog('User not found | deleteCustomer / databaseController.js')
            return returnResponse('User not found', null, 404)
        }
    }

    // delete the customer from the database
    addLog('DELETE Customer query | deleteCustomer / databaseController.js')

    const result = (await (await dbConnection).query(`DELETE
                                                      FROM customer
                                                      WHERE id = ${id}`))

    // check if the customer was deleted
    if (result[0].affectedRows === 0) {
        // return the response with empty data
        addLog('Customer not found | deleteCustomer / databaseController.js')
        return returnResponse('Customer not found', null, 404)
    }

    // return the response
    addLog('Customer deleted | deleteCustomer / databaseController.js')
    return returnResponse('Customer deleted', {id}, 200)
}

// Update customer in the database
const updateCustomer = async (id, first_name, last_name, phone) => {
    // check parameters are provided
    if (!id) {
        addLog('Id is required | updateCustomer / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    if (!first_name || !last_name || !phone) {
        addLog('First name, last name and phone are required | updateCustomer / databaseController.js')
        return returnResponse('First name, last name, email and phone are required', null, 400)
    }

    // try find phone in database
    const customerByPhone = await findCustomerByPhone(phone);

    if (customerByPhone.status !== 404 && customerByPhone.data.id !== Number(id)) {
        addLog('Phone already exists | updateCustomer / databaseController.js')
        return returnResponse('Phone already exists', null, 400)
    }

    // update the customer in the database
    addLog('UPDATE Customer query | updateCustomer / databaseController.js')

    const result = (await (await dbConnection).query(`UPDATE customer
                                                      SET first_name = '${first_name}',
                                                          last_name  = '${last_name}',
                                                          phone      = '${phone}'
                                                      WHERE id = ${id}`))

    // check if the customer was updated
    if (result[0].affectedRows === 0) {
        addLog('Customer not found | updateCustomer / databaseController.js')
        return returnResponse('Customer not found', null, 404)
    }

    addLog('Customer updated | updateCustomer / databaseController.js')
    // return the response
    return returnResponse('Customer updated', {
        id, first_name, last_name, phone
    }, 200)
}

// Get customer from the database
const getCustomer = async (id) => {
    // check if id is provided
    if (!id) {
        addLog('Id is required | getCustomer / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    // get the customer from the database
    addLog('SELECT Customer query | getCustomer / databaseController.js')

    const result = (await (await dbConnection).query(`SELECT *
                                                      FROM customer
                                                      WHERE id = ${id}`))[0][0]


    // check if the customer was found--
    if (!result || result.length === 0) {
        // return the response with not found status
        addLog('Customer not found | getCustomer / databaseController.js')
        return returnResponse("Customer not found", null, 404)
    }

    // return the response
    addLog('Customer found | getCustomer / databaseController.js')
    return returnResponse("Customer found", result, 200)
}


// Create service in the database
const createService = async (name, description, price, customer_id) => {
    // check parameters are provided
    if (!customer_id) {
        addLog('Customer id is required | createService / databaseController.js')
        return returnResponse('Customer id is required', null, 400)
    }

    if (!name || !description || !price) {
        addLog('Name, description and price are required | createService / databaseController.js')
        return returnResponse('Name, description and price are required', null, 400)
    }

    // insert the service into the database
    addLog('INSERT Service query | createService / databaseController.js')

    const result = (await (await dbConnection)
        .query(`INSERT INTO service (name, description, price, customer_id)
                VALUES ('${name}', '${description}', ${price}, ${customer_id})`))


    addLog('Service created | createService / databaseController.js')
    // return the response
    return returnResponse('Service created', {
        name, description, price, customer_id
    }, 201)
}

// Delete service from the database
const deleteService = async (id) => {
    // check if id is provided
    if (!id) {
        addLog('Id is required | deleteService / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    // delete the service from the database
    addLog('DELETE Service query | deleteService / databaseController.js')

    const result = (await (await dbConnection).query(`DELETE
                                                      FROM service
                                                      WHERE id = ${id}`))

    // check if the service was deleted
    if (result[0].affectedRows === 0) {
        // return the response with not found status
        addLog('Service not found | deleteService / databaseController.js')
        return returnResponse('Service not found', null, 404)
    }

    // return the response
    addLog('Service deleted | deleteService / databaseController.js')
    return returnResponse('Service deleted', {id}, 200)
}

// Update service in the database
const updateService = async (id, name, description, price, customer_id) => {
    // check parameters are provided
    if (!id) {
        addLog('Id is required | updateService / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    if (!name || !description || !price) {
        addLog('Name, description and price are required | updateService / databaseController.js')
        return returnResponse('Name, description and price are required', null, 400)
    }

    if (!customer_id) {
        addLog('Customer id is required | updateService / databaseController.js')
        return returnResponse('Customer id is required', null, 400)
    }

    // update the service in the database
    addLog('UPDATE Service query | updateService / databaseController.js')

    const result = (await (await dbConnection).query(`UPDATE service
                                                      SET name        = '${name}',
                                                          description = '${description}',
                                                          price       = ${price},
                                                          customer_id = ${customer_id}
                                                      WHERE id = ${id}`))

    if (result[0].affectedRows === 0) {
        addLog('Service not found | updateService / databaseController.js')
        return returnResponse('Service not found', null, 404)
    }


    addLog('Service updated | updateService / databaseController.js')
    // return the response
    return returnResponse('Service updated', {
        id, name, description, price, customer_id
    }, 200)
}

// Get service from the database
const getService = async (id) => {
    // check if id is provided
    if (!id) {
        addLog('Id is required | getService / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    // get the service from the database
    addLog('SELECT Service query | getService / databaseController.js')

    const result = (await (await dbConnection).query(`SELECT *
                                                      FROM service
                                                      WHERE id = ${id}`))[0][0]

    // check if the service was found
    if (!result || result.length === 0) {
        // return the response with not found status
        addLog('Service not found | getService / databaseController.js')
        return returnResponse("Service not found", null, 404)
    }

    // return the response
    addLog('Service found | getService / databaseController.js')
    return returnResponse("Service found", result, 200)
}

// Create user in the database
const createUser = async (email, password, customer_id, role_id) => {
    // check parameters are provided
    if (!email || !password) {
        addLog('Email, password are required | createUser / databaseController.js')
        return returnResponse('Email, password are required', null, 400)
    }

    if (!customer_id) {
        addLog('Customer id is required | createUser / databaseController.js')
        return returnResponse('Customer id is required', null, 400)
    }

    if (!role_id) {
        addLog('Role id is required | createUser / databaseController.js')
        return returnResponse('Role id is required', null, 400)
    }

    // try find email in database
    const userByEmail = await findUserByEmail(email);

    if (userByEmail.status !== 404) {
        addLog('Email already exists | updateUser / databaseController.js')
        return returnResponse('Email already exists', null, 400)
    }

    const userByCustomerId = await findUserByCustomerId(customer_id);

    if (userByCustomerId.status !== 404) {
        addLog('User with same customer id already exists | updateUser / databaseController.js')
        return returnResponse('User with same customer already exists', null, 400)
    }


    // insert the user into the database
    addLog('INSERT User query | createUser / databaseController.js')

    const result = (await (await dbConnection)
        .query(`INSERT INTO user (email, password, customer_id, role_id)
                VALUES ('${email}', '${password}', ${customer_id}, ${role_id})`))


    addLog('User created | createUser / databaseController.js')
    // return the response
    return returnResponse('User created', {
        email, customer_id, role_id
    }, 201)
}

// Delete user from the database
const deleteUser = async (id) => {
    // check if id is provided
    if (!id) {
        addLog('Id is required | deleteUser / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    // get the user from the database by customer id
    const customerByUserId = await findUserByCustomerId(id);

    // check if user has customer
    if (customerByUserId.status !== 404) {
        addLog('User has customer | deleteUser / databaseController.js')
        return returnResponse('User has customer', null, 400)
    }

    // delete the user from the database
    addLog('DELETE User query | deleteUser / databaseController.js')

    const result = (await (await dbConnection).query(`DELETE
                                                      FROM user
                                                      WHERE id = ${id}`))

    // check if the user was deleted
    if (result[0].affectedRows === 0) {
        // return the response with not found status
        addLog('User not found | deleteUser / databaseController.js')
        return returnResponse('User not found', null, 404)
    }

    // return the response
    addLog('User deleted | deleteUser / databaseController.js')
    return returnResponse('User deleted', {id}, 200)
}

// Update user in the database
const updateUser = async (id, email, password, customer_id, role_id) => {
    // check parameters are provided
    if (!id) {
        addLog('Id is required | updateUser / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    if (!email || !password) {
        addLog('Email, password are required | updateUser / databaseController.js')
        return returnResponse('Email, password are required', null, 400)
    }

    if (!customer_id) {
        addLog('Customer id is required | updateUser / databaseController.js')
        return returnResponse('Customer id is required', null, 400)
    }

    if (!role_id) {
        addLog('Role id is required | updateUser / databaseController.js')
        return returnResponse('Role id is required', null, 400)
    }

    // try find email in database
    const userByEmail = await findUserByEmail(email);

    if (userByEmail.status !== 404 && userByEmail.data.id !== Number(id)) {
        addLog('Email already exists | updateUser / databaseController.js')
        return returnResponse('Email already exists', null, 400)
    }

    const userByCustomerId = await findUserByCustomerId(customer_id);

    if (userByCustomerId.status !== 404 && userByCustomerId.data.id !== Number(id)) {
        addLog('User with same customer id already exists | updateUser / databaseController.js')
        return returnResponse('User with same customer already exists', null, 400)
    }

    // update the user in the database
    addLog('UPDATE User query | updateUser / databaseController.js')

    const result = (await (await dbConnection).query(`UPDATE user
                                                      SET email       = '${email}',
                                                          password    = '${password}',
                                                          customer_id = ${customer_id},
                                                          role_id     = ${role_id}
                                                      WHERE id = ${id}`))

    if (result[0].affectedRows === 0) {
        addLog('User not found | updateUser / databaseController.js')
        return returnResponse('User not found', null, 404)
    }

    addLog('User updated | updateUser / databaseController.js')
    // return the response
    return returnResponse('User updated', {
        id, email, customer_id, role_id
    }, 200)
}

// Get user from the database
const getUser = async (id) => {
    // check if id is provided
    if (!id) {
        addLog('Id is required | getUser / databaseController.js')
        return returnResponse('Id is required', null, 400)
    }

    // get the user from the database
    addLog('SELECT User query | getUser / databaseController.js')

    const result = (await (await dbConnection).query(`SELECT *
                                                      FROM user
                                                      WHERE id = ${id}`))[0][0]

    // check if the user was found
    if (!result || result.length === 0) {
        // return the response with not found status
        addLog('User not found | getUser / databaseController.js')
        return returnResponse("User not found", null, 404)
    }

    // return the response
    addLog('User found | getUser / databaseController.js')
    result.password = undefined
    return returnResponse("User found", result, 200)
}

// Find user by email
const findUserByEmail = async (email) => {
    // check if email is provided
    if (!email) {
        addLog('Email is required | findEmail / databaseController.js')
        return returnResponse('Email is required', null, 400)
    }

    // get the user from the database
    addLog('SELECT User query | findEmail / databaseController.js')

    const result = (await (await dbConnection).query(`SELECT *
                                                      FROM user
                                                      WHERE email = '${email}'`))[0][0]

    // check if the user was found
    if (!result || result.length === 0) {
        addLog('User not found | findEmail / databaseController.js')
        return returnResponse("User not found", null, 404)
    }

    // return the response
    addLog('User found | findEmail / databaseController.js')
    return returnResponse("User found", result, 200)
}

// Find user by customer id
const findUserByCustomerId = async (customer_id) => {
    // check if customer id is provided
    if (!customer_id) {
        addLog('Customer id is required | findUserByCustomerId / databaseController.js')
        return returnResponse('Customer id is required', null, 400)
    }


    //  get the user from the database
    addLog('SELECT User query | findUserByCustomerId / databaseController.js')

    const result = (await (await dbConnection).query(`SELECT *
                                                      FROM user
                                                      WHERE customer_id = ${customer_id}`))[0][0]

    // check if the user was found
    if (!result || result.length === 0) {
        addLog('User not found | findUserByCustomerId / databaseController.js')
        return returnResponse("User not found", null, 404)
    }

    // return the response
    addLog('User found | findUserByCustomerId / databaseController.js')
    return returnResponse("User found", result, 200)
}

// Find customer by phone
const findCustomerByPhone = async (phone) => {
    // check if phone is provided
    if (!phone) {
        addLog('Phone is required | findCustomerByPhone / databaseController.js')
        return returnResponse('Phone is required', null, 400)
    }

    // get the customer from the database
    addLog('SELECT Customer query | findCustomerByPhone / databaseController.js')

    const result = (await (await dbConnection).query(`SELECT *
                                                      FROM customer
                                                      WHERE phone = '${phone}'`))[0][0]

    // check if the customer was found
    if (!result || result.length === 0) {
        addLog('Customer not found | findCustomerByPhone / databaseController.js')
        return returnResponse("Customer not found", null, 404)
    }

    // return the response
    addLog('Customer found | findCustomerByPhone / databaseController.js')
    return returnResponse("Customer found", result, 200)
}


// other functions

const returnResponse = (message, data, status) => {
    return {
        message: message,
        data: data,
        status: status
    }
}

module.exports = {
    createCustomer,
    deleteCustomer,
    updateCustomer,
    getCustomer,
    createService,
    deleteService,
    updateService,
    getService,
    createUser,
    deleteUser,
    updateUser,
    getUser,
    findUserByEmail,
    returnResponse
}



