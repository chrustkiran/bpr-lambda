const dynamodb = require('../config/dynamodbConfig')
const ModificationError = require('../exceptions/ModificationError')

const CustomerTableName = `CustomersTable_bpr_${process.env.STAGE}`
const VehicleTableName = `VehiclesTable_bpr_${process.env.STAGE}`
const CustomerIDIndex = 'CustomerIDIndex'

const getAllVehiclesForCustomer = async (customerId) => {
  const scanParams = { 
    TableName: VehicleTableName,
    ProjectionExpression: 'VehicleNumber, Make, Model',
    IndexName: CustomerIDIndex,
    KeyConditionExpression: 'CustomerID = :ci',
    ExpressionAttributeValues: {
        ':ci': customerId
    }
 }
  const res = await dynamodb.query(scanParams).promise()
  return res;
}

const getVehicleDetails = async (vehicleNumber) => {
  const params = {
    TableName: VehicleTableName,
    KeyConditionExpression: 'VehicleNumber = :vn',
    ExpressionAttributeValues: {
        ':vn': vehicleNumber
    }
};
const result = await dynamodb.query(params).promise();
return result;
}

const addVehicleForCustomer = async (vehicle) => {
    const params = {
        TransactItems: [
          {
            Update: {
              TableName: CustomerTableName,
              Key: { CustomerID: vehicle.CustomerID }, 
              UpdateExpression: 'SET #vehicles = list_append(#vehicles, :newVehicle)',
              ExpressionAttributeNames: {
                '#vehicles': 'Vehicles', 
              },
              ExpressionAttributeValues: {
                ':newVehicle': [vehicle.VehicleNumber], 
              }
            }
          },
          {
            Put: {
              TableName: VehicleTableName,
              Item: vehicle,
            },
          }
        ]
      };
const result = await dynamodb.transactWrite(params).promise();
return result;
}

const updateVehicle = async (vehicleId, updatedVehicle) => {
    const existingVehicles = await getVehicleDetails(vehicleId);
    if (existingVehicles.Count == 1) {
        const modifiedVehicles = {...existingVehicles}
        modifiedVehicles['']
    } else {
        throw new ModificationError(`There is no vehicle that exists with vehicle id ${vehicleId}`)
    }
}

module.exports = {getAllCustomers, searchCustomer, getCustomerByCustomerId, createOrUpdateCustomers}