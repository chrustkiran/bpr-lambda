'use strict'
var AWS = require('aws-sdk');
const dynamodb = require('../config/dynamodbConfig')

const TableName = `UsersTable_${process.env.STAGE}`

const getAllUsers = async () => {
  const scanParams = { TableName: TableName }
  const res = await dynamodb.scan(scanParams).promise()
  console.log(res);
  return res;
}

module.exports = {getAllUsers}