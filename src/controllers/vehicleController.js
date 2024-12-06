const vehicleService = require("../services/vehicleService");
const { returnError } = require("../utils/exceptionHandler");
const responseHandler = require("../utils/responseUtil");
const requestValidator = require("../validators/requestValidator");

const getAllVehicles = async (events) => {
  try {
    const result = await vehicleService.getAllVehicles(
      events.pathParameters?.customerId
    );
    return responseHandler.returnSuccessResponse(result);
  } catch (error) {
    console.error("There was an error while getting all vehicle records", error);
    return returnError(error);
  }
};


const createVehicle = async (events) => {
  try {
    const customerId = events.pathParameters.customerId;
    const body = JSON.parse(events.body);
    requestValidator.createVehilesRequestValidator(body, customerId);
    const result = await vehicleService.createVehicle(body.vehicles);
    return responseHandler.returnCreatedResponse(result);
  } catch (error) {
    console.error("There was an error while creating vehicle ", error);
    return returnError(error);
  }
};

const getVehicleDetails = async (events) => {
  const vehicleId = events.pathParameters?.vehicleId;
  try {
    const result = await vehicleService.getVehicleDetails(vehicleId);
    return responseHandler.returnSuccessResponse(result);
  } catch (error) {
    console.error(
      `There was an error while getting vehicle record for vechile id ${vehicleId}`,
      error
    );
    return returnError(error);
  }
};

const updateVehicle = async (events) => {
  const vehicleId = events.pathParameters?.vehicleId;
  try {
    const body = JSON.parse(events.body);
    requestValidator.modifyVehicleRequestValidator(body, customerId);
    const result = await vehicleService.updateVehicle(body);
    return responseHandler.returnAcceptedResponse(result);
  } catch (error) {
    console.error(
      `There was an error while modifying vehicle record for vehicle id ${vehicleId}`,
      error
    );
    return returnError(error);
  }
};

const removeVehicle = async (events) => {
  try {
    const vehicleId = events.pathParameters?.vehicleId;
    await vehicleService.removeVehicle(vehicleId);
    return responseHandler.returnAcceptedResponse();
  } catch (error) {
    console.error(
      `There was an error while deleting vehicle record for vehicle id ${vehicleId}`,
      error
    );
    return returnError(error);
  }
}

module.exports = {
  getAllVehicles,
  createVehicle,
  getVehicleDetails,
  updateVehicle,
  removeVehicle
};
