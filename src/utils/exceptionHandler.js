const returnError = (error) => {
    if (error) {
        return {
            statusCode: error.statusCode || 500,
            body: error.message
        }
    }
    return {
        statusCode: 500,
        body: error.message
    }
}

module.exports = {returnError}