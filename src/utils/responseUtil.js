const returnSuccessResponse = (res) => {
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}

const returnCreatedResponse = (res) => {
    return {
        statusCode: 201,
        body: JSON.stringify(res)
    }
}

module.exports = {returnSuccessResponse, returnCreatedResponse}