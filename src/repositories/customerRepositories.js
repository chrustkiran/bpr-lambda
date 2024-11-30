const dynamodb = require('../config/dynamodbConfig')

const TableName = `CustomersTable_${process.env.STAGE}`
const PhoneNumberIndex = 'PhoneNumberIndex'

const getAllCustomers = async () => {
  const scanParams = { TableName: TableName }
  const res = await dynamodb.scan(scanParams).promise()
  return res;
}

const  searchCustomer = async (phoneNumber) => {
  const params = {
    TableName: TableName,
    IndexName: PhoneNumberIndex,
    KeyConditionExpression: 'PhoneNumber = :pn',
    ExpressionAttributeValues: {
        ':pn': phoneNumber
    }
};
console.log(params)
const result = await dynamodb.query(params).promise();
return result;
}

module.exports = {getAllCustomers, searchCustomer}