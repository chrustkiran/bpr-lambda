var AWS = require('aws-sdk');

const offline = process.env.IS_OFFLINE;
console.log(process.env)
const dynamodb = offline ? new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://localhost:8000'
}) : new AWS.DynamoDB.DocumentClient()

module.exports = dynamodb

//aws dynamodb list-tables --endpoint-url http://localhost:8000