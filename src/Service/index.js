const {deleteService, updateService, getService, createService, getCustomer} = require("../Database/databaseController");

// Create new service
const serviceCreation = async (req, res) => {
    // get the query parameters
    const {name, description, price, customer_id} = req.query;

    // call the createService function and wait for the result
    const serviceResultJson = await createService(name, description, price, customer_id);

    // get customer from result and set it to the service
    serviceResultJson.data = await addCustomerToService(serviceResultJson.data)

    // set the status and send the result
    res.status(serviceResultJson.status)
    res.json(serviceResultJson)
}

// Delete a service
const serviceDeletion = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // call the deleteService function and wait for the result
    const serviceResultJson = await deleteService(id);

    // set the status and send the result
    res.status(serviceResultJson.status)
    res.json(serviceResultJson)
}

// Update a service
const serviceUpdate = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // get the query parameters
    const {name, description, price, customer_id} = req.query;

    // call the updateService function and wait for the result
    const serviceResultJson = await updateService(id, name, description, price, customer_id);

    // get customer from result and set it to the service
    serviceResultJson.data = await addCustomerToService(serviceResultJson.data)

    // set the status and send the result
    res.status(serviceResultJson.status)
    res.json(serviceResultJson)
}

// Get a service
const serviceGet = async (req, res) => {
    // get the id from the url
    const id = req.params.id

    // call the getService function and wait for the result
    const serviceResultJson = await getService(id);

    // get customer from result and set it to the service
    serviceResultJson.data = await addCustomerToService(serviceResultJson.data)

    // set the status and send the result
    res.status(serviceResultJson.status)
    res.json(serviceResultJson)
}

// Add customer to service
const addCustomerToService = async (service) => {
    service.customer = (await getCustomer(service.customer_id)).data
    service.customer_id = undefined
    return service
}

module.exports = {
    serviceCreation,
    serviceDeletion,
    serviceUpdate,
    serviceGet
}