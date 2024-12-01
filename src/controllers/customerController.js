const customerService = require('../services/customerService')
const {returnError} = require('../utils/exceptionHandler')
const responseHandler = require('../utils/responseUtil')
const requestValidator = require('../validators/requestValidator')

const getAllCustomers = async (events) => {
    try {
        const result = await customerService.getAllCustomers(events.queryStringParameters?.isSorting)
        return responseHandler.returnSuccessResponse(result)
    } catch (error) {
        console.error('There was an error while getting all user records', error)
        return returnError(error)
    }
}

const searchCustomer = async (events) => {
    try {
        const body = JSON.parse(events.body)
        requestValidator.customerSearchRequestValidator(body)
        const result = await customerService.searchCustomer(body.phoneNumber)
        return responseHandler.returnSuccessResponse(result)
    } catch(error) {
        console.error('There was an error while searching customer ', error)
        return returnError(error)
    }
}

const createCustomers = async (events) => {
    try {
        const body = JSON.parse(events.body)
        requestValidator.createCustomersRequestValidator(body)
        const result = await customerService.createCustomers(body.customers)
        return responseHandler.returnCreatedResponse(result)
    } catch(error) {
        console.error('There was an error while searching customer ', error)
        return returnError(error)
    }
}

const getCustomerByCustomerId = async(events) => {
    const customerId = events.pathParameters?.customerId;
    try {
        const result = await customerService.getCustomerByCustomerId(customerId)
        return responseHandler.returnSuccessResponse(result)
    } catch (error) {
        console.error(`There was an error while getting customer record for customer id ${customerId}`, error)
        return returnError(error)
    }
}




module.exports={getAllCustomers, searchCustomer, createCustomers, getCustomerByCustomerId}