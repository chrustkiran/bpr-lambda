const dynamodb = require("../config/dynamodbConfig");
const ModificationError = require("../exceptions/ModificationError");

const CustomerTableName = `CustomersTable_bpr_${process.env.STAGE}`;
const VehicleTableName = `VehiclesTable_bpr_${process.env.STAGE}`;
const CustomerIDIndex = "CustomerIDIndex";

const getAllVehiclesForCustomer = async (customerId) => {
  const scanParams = {
    TableName: VehicleTableName,
    ProjectionExpression: "VehicleID, VehicleNumber, Make, Model",
    IndexName: CustomerIDIndex,
    KeyConditionExpression: "CustomerID = :ci",
    ExpressionAttributeValues: {
      ":ci": customerId,
    },
  };
  const res = await dynamodb.query(scanParams).promise();
  return res;
};

const getVehicleDetails = async (vehicleId) => {
  const params = {
    TableName: VehicleTableName,
    KeyConditionExpression: "VehicleID = :vi",
    ExpressionAttributeValues: {
      ":vi": vehicleId,
    },
  };
  const result = await dynamodb.query(params).promise();
  return result;
};

const addVehicleForCustomer = async (vehicle) => {
  const params = {
    TransactItems: [
      {
        Update: {
          TableName: CustomerTableName,
          Key: { CustomerID: vehicle.CustomerID },
          UpdateExpression:
            "SET #vehicles = list_append(#vehicles, :newVehicle)",
          ExpressionAttributeNames: {
            "#vehicles": "Vehicles",
          },
          ExpressionAttributeValues: {
            ":newVehicle": [vehicle.VehicleNumber],
          },
        },
      },
      {
        Put: {
          TableName: VehicleTableName,
          Item: vehicle,
        },
      },
    ],
  };
  const result = await dynamodb.transactWrite(params).promise();
  return result;
};

const updateVehicle = async (updatedVehicle) => {
  const params = {
    TableName: VehicleTableName,
    Item: updatedVehicle,
  };
  return await dynamodb.put(params).promise();
};

const updateVehicleWithVehicleNumber = async (
  updatedVehicle,
  updatedVehicleNumbersForCustomer
) => {
  const params = {
    TransactItems: [
      getUpdatedVehicleNumberParamForCustomer(
        updatedVehicle.CustomerID,
        updatedVehicleNumbersForCustomer
      ),
      {
        Put: {
          TableName: VehicleTableName,
          Item: vehicle,
        },
      },
    ],
  };
  return await dynamodb.transactWrite(params).promise();
};

const getUpdatedVehicleNumberParamForCustomer = (
  customerID,
  updatedVehicles
) => {
  return {
    Update: {
      TableName: CustomerTableName,
      Key: { CustomerID: customerID },
      UpdateExpression: "SET #vehicles = :updatedVehicles",
      ExpressionAttributeNames: {
        "#vehicles": "Vehicles",
      },
      ExpressionAttributeValues: {
        ":updatedVehicles": updatedVehicles,
      },
    },
  };
};

const removeVehicle = async (vehicleId, updatedVehicledNumbers, customerId) => {
  const params = {
    TransactItems: [
      getUpdatedVehicleNumberParamForCustomer(
        customerId,
        updatedVehicledNumbers
      ),
      {
        Delete: {
          TableName: VehicleTableName,
          Key: { VehicleID: vehicleId },
        },
      },
    ],
  };

  return await dynamodb.transactWrite(params).promise();
};

module.exports = {
  getAllVehiclesForCustomer,
  addVehicleForCustomer,
  updateVehicle,
  getVehicleDetails,
  updateVehicleWithVehicleNumber,
  removeVehicle
};
