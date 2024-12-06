const customerRepo = require("../repositories/customerRepositories");
const vehicleRepo = require("../repositories/vehicleRepositories");
const Response = require("../dto/Response");
const NoResultsError = require("../exceptions/NoResultsError");
const { randomUUID } = require("crypto");
const ModificationError = require("../exceptions/ModificationError");

const getAllVehicles = async (customerId) => {
  const result = await vehicleRepo.getAllVehiclesForCustomer(customerId);
  if (result.Count == 0) {
    throw new NoResultsError(
      "There is no record for this query :getAllCustomers()"
    );
  }
  return new Response(result.Items, result.Count);
};

const getVehicleDetails = async (vehicleId) => {
  const result = await vehicleRepo.getVehicleDetails(vehicleId);
  if (result.Count == 0) {
    throw new NoResultsError(
      "There is no record for this query :await()"
    );
  }
  return new Response(result.Items, result.Count);
};

const createVehicle = async (vehicles) => {
  const {createItem} = require('./commonServices')
  return await createItem(vehicles, 'VehicleID', vehicleRepo.createVehicle, 'Vehilces')
};


const updateVehicle = async (updatedVehicle) => {
  const existingVehicles = await vehicleRepo.getVehicleDetails(
    updatedVehicle.VehicleID
  );
  if (existingVehicles.Count == 1) {
    const existingVehicle = existingVehicles.Items[0];
    //This api doesn't allow to modify Invoices, Quotations and CustomerID
    const modifiedVehicles = {
      ...updatedVehicle,
      Invoices: existingVehicle.Invoices,
      Quotations: existingVehicle.Quotations,
      CustomerID: existingVehicle.CustomerID,
    };
    if (existingVehicle.VehicleNumber != updatedVehicle.VehicleNumber) {
      modifiedVehicles["VehicleNumber"] = updatedVehicle.VehicleNumber;
      return await updateCustomerVehiclesAndVehicleTable(
        modifiedVehicles,
        existingVehicle.VehicleNumber
      );
    } else {
      return await vehicleRepo.updateVehicle(modifiedVehicles);
    }
  } else {
    throw new ModificationError(
      `There is no vehicle that exists with vehicle id ${vehicleId}`
    );
  }
};

const updateCustomerVehiclesAndVehicleTable = async (
  modifiedVehicle,
  existingVehicleNumber
) => {
  const customerRes = await customerRepo.getCustomerByCustomerId(
    modifiedVehicle.CustomerID
  );
  if (customerRes.Count == 1) {
    const updatedVehicleNumbers = [
      modifiedVehicle.VehicleNumber,
      ...customerRes.Items[0].vehicleNums.filter(
        (vn) => vn != existingVehicleNumber
      ),
    ];
    return await vehicleRepo.updateVehicleWithVehicleNumber(
      modifiedVehicle,
      updatedVehicleNumbers
    );
  } else {
    throw new ModificationError(
      `There is no customer associated with vehicleNumber ${existingVehicleNumber}`
    );
  }
};

const removeVehicle = async (vehicleId) => {
  const existingVehicles = await vehicleRepo.getVehicleDetails(vehicleId);
  if (existingVehicles.Count == 1) {
    const existingVehicle = existingVehicles.Items[0];
    const customerRes = await customerRepo.getCustomerByCustomerId(
      existingVehicle.CustomerID
    );
    if (customerRes.Count == 1) {
      const updatedVehicleNumbers = 
        customerRes.Items[0].vehicleNums.filter(
          (vn) => vn != existingVehicle.VehicleNumber
        )
      return await vehicleRepo.removeVehicle(vehicleId, updatedVehicleNumbers, customerRes.Items[0].CustomerID)
    } else {
      throw new ModificationError(
        `There is no customer associated with vehicleId ${existingVehicle.VehicleID}`
      );
    }
  } else {
    throw new ModificationError(
      `There is no vehicle that exists with vehicle id ${vehicleId}`
    );
  }
};

module.exports = {
  getAllVehicles,
  getVehicleDetails,
  createVehicle,
  updateVehicle,
  removeVehicle
};
