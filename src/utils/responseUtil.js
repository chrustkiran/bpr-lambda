const returnSuccessResponse = (res) => {
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}

module.exports = {returnSuccessResponse}