'use strict'
var AWS = require('aws-sdk');
const dynamoDb = require('./src/config/dynamodbConfig')


module.exports.createCustomer = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString())
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: body.name,
      email: body.email
    }
  }
  await dynamoDb.put(putParams).promise()

  return {
    statusCode: 201
  }
}