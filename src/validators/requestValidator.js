const BadRequestError = require("../exceptions/BadRequestError");

const customerSearchRequestValidator = (body) => {
  if (!australianPhoneNumberValidator(body.phoneNumber)) {
    throw new BadRequestError("Either phone number is not present or invalid.");
  }
};

const createCustomersRequestValidator = (body) => {
  if (!body.customers) throw new BadRequestError("Please provide customers");
  const { validateArrayWithRules } = require("../validators/commonValidator");
  const rules = [
    {
      field: "PhoneNumber",
      validator: australianPhoneNumberValidator,
      required: true,
    },
    { field: "FirstName", required: true },
    { field: "Suburb", required: false, validator: suburbValidator },
    { field: "PostalCode", required: false },
  ];
  if (!validateArrayWithRules(body.customers, rules)) {
    throw new BadRequestError("Validation Error");
  }
};

const createVehilesRequestValidator = (body, customerId) => {
  if (!body.vehicles) throw new BadRequestError("Please provide vehicles");
  if (body.vehicles.customerId != customerId) throw new BadRequestError("Please provide vehicles");
  const { validateArrayWithRules } = require("../validators/commonValidator");
  const rules = [
    { field: "CustomerID", required: true }, // pass a function to check actually valid customer.
    { field: "Make", required: true },
    { field: "Model", required: true },
    { field: "Year", required: true },
  ];
  if (!validateArrayWithRules(body.vehicles, rules)) {
    throw new BadRequestError("Validation Error");
  }
};

const modifyCustomerRequestValidator = (body, customerId) => {
  if (body.customerId != customerId)
    throw new BadRequestError("Customer Ids are not matched");
  createCustomersRequestValidator(body);
};

const modifyVehicleRequestValidator = (body, vehicleId) => {
    if (body.vehicleId != vehicleId)
        throw new BadRequestError("Vehicle Ids are not matched");
    createVehilesRequestValidator(body, body.customerId);
}

const australianPhoneNumberValidator = (phoneNumber) => {
  if (!phoneNumber) return false;
  const regex = /^(\+61|0)[2-9]{1}[0-9]{8}$/;
  return regex.test(phoneNumber);
};

const suburbValidator = (suburb) => {
  return typeof suburb === "number" && !isNaN(suburb);
};

module.exports = {
  customerSearchRequestValidator,
  createCustomersRequestValidator,
  modifyCustomerRequestValidator,
  createVehilesRequestValidator,
  modifyVehicleRequestValidator
};
