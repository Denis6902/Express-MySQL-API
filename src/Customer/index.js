const {deleteCustomer, getCustomer, updateCustomer, createCustomer} = require("../Database/databaseController");

// Create new customer
const customerCreation = async (req, res) => {
    // get the query parameters
    const {first_name, last_name, phone} = req.query;

    // call the createCustomer function and wait for the result
    const customerResultJson = await createCustomer(first_name, last_name, phone)

    // set the status and send the result
    res.status(customerResultJson.status)
    res.json(customerResultJson);
}

// Delete a customer
const customerDeletion = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // call the deleteCustomer function and wait for the result
    const customerResultJson = await deleteCustomer(id);

    // set the status and send the result
    res.status(customerResultJson.status)
    res.json(customerResultJson);
}

// Update a customer
const customerUpdate = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // get the query parameters
    const {first_name, last_name, phone} = req.query;

    // call the updateCustomer function and wait for the result
    const customerResultJson = await updateCustomer(id, first_name, last_name, phone);

    // set the status and send the result
    res.status(customerResultJson.status)
    res.json(customerResultJson);
}

// Get a customer
const customerGet = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // call the getCustomer function and wait for the result
    const customerResultJson = await getCustomer(id);

    // set the status and send the result
    res.status(customerResultJson.status)
    res.json(customerResultJson);
}

module.exports = {
    customerCreation, customerDeletion, customerUpdate, customerGet
}