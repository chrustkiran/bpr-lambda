const NoResultsError = require('../exceptions/NoResultsError')

const returnError = (error) => {
    if (error instanceof NoResultsError) {
        return {
            statusCode: error.statusCode,
            body: error.message
        }
    }
}

module.exports = {returnError}