const dynamodb = require("../config/dynamodbConfig");
const ModificationError = require("../exceptions/ModificationError");

const InvoiceTableName = `InvoicesTable_bpr_${process.env.STAGE}`;
const VehicleIDIndex = "VehicleIDIndex"; 

ID
const getAllInvoicesByVehicleId = async (vehicleId) => {
  const scanParams = {
    TableName: InvoiceTableName,
    ProjectionExpression: "InvoiceNumber, Date, Type",
    IndexName: VehicleIDIndex,
    KeyConditionExpression: "VehicleID = :vi",
    ExpressionAttributeValues: {
      ":vi": vehicleId,
    },
  };

  const res = await dynamodb.query(scanParams).promise();
  return res.Items;
};


const addOrUpdateInvoice = async (invoice) => {
  const params = {
    TableName: InvoiceTableName,
    Item: invoice,
  };

  const result = await dynamodb.put(params).promise();
  return result;
};



const getInvoiceDetailsByInvoiceNumber = async (invoiceNumber) => {
  const params = {
    TableName: InvoiceTableName,
    KeyConditionExpression: "InvoiceNumber = :in",
    ExpressionAttributeValues: {
      ":in": invoiceNumber,
    },
  };

  const result = await dynamodb.query(params).promise();
  return result.Items; 
};

module.exports = {
  getAllInvoicesByVehicleId,
  addOrUpdateInvoice,
  getInvoiceDetailsByInvoiceNumber,
};
