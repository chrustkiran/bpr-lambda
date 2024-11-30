const BadRequestError = require("../exceptions/BadRequestError");

const customerSearchRequestValidator = (body) => {
    if (!australianPhoneNumberValidator(body.phoneNumber)) {
        throw new BadRequestError("Either phone number is not present or invalid.")
    }
}

const australianPhoneNumberValidator = (phoneNumber) => {
    if (!phoneNumber) return false;
    const regex = /^(\+61|0)[2-9]{1}[0-9]{8}$/;
    return regex.test(phoneNumber);
}

module.exports = {customerSearchRequestValidator}