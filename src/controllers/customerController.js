const customerService = require('../services/customerService')
const {returnError} = require('../utils/exceptionHandler')
const responseHandler = require('../utils/responseUtil')

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
    const { customerSearchRequestValidator } = require('../validators/requestValidator')
    try {
        const body = JSON.parse(events.body)
        console.log(body)
        customerSearchRequestValidator(body)
        const result = await customerService.searchCustomer(body.phoneNumber)
        return responseHandler.returnSuccessResponse(result)
    } catch(error) {
        console.error('There was an error while searching customer ', error)
        return returnError(error)
    }
}


module.exports={getAllCustomers, searchCustomer}