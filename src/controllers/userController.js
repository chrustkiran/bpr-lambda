const userService = require('../services/userService')
const returnError = require('../utils/exceptionHandler')
const responseHandler = require('../utils/responseUtil')

const getAllUsers = async (events) => {
    try {
        const result = await userService.getAllUsers()
        return responseHandler.returnSuccessResponse(result)
    } catch (error) {
        return returnError(error)
    }
}

const createUsers = async

module.exports={getAllUsers}