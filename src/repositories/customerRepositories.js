const dynamodb = require('../config/dynamodbConfig')

const TableName = `CustomersTable_bpr_${process.env.STAGE}`
const PhoneNumberIndex = 'PhoneNumberIndex'

const getAllCustomers = async () => {
  const scanParams = { TableName: TableName,  ProjectionExpression: 'CustomerID, FirstName, LastName, PhoneNumber' }
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
const result = await dynamodb.query(params).promise();
return result;
}

const getCustomerByCustomerId = async (customerId) => {
  const params = {
    TableName: TableName,
    KeyConditionExpression: 'CustomerID = :ci',
    ExpressionAttributeValues: {
        ':ci': customerId
    }
};
const result = await dynamodb.query(params).promise();
return result;
}

const createOrUpdateCustomers = async (customer) => {
  //moslty from prod we are going to insert only one item, so that I have used only put method in foreach.
  const params = {
    TableName: TableName,
    Item: customer
  };
  await dynamodb.put(params).promise();
}

module.exports = {getAllCustomers, searchCustomer, getCustomerByCustomerId, createOrUpdateCustomers}