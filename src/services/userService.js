'use strict'
var AWS = require('aws-sdk');
const dynamodb = require('../../db')

module.exports.getUsers = async (event) => {
  const scanParams = {
    TableName: 'UsersTable'
  }

  const result = await dynamodb.scan(scanParams).promise()
  if (result.Count === 0) {
    return {
      statusCode: 404
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items
    })
  }

}