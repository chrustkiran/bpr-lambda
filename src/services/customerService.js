const customerRepo = require('../repositories/customerRepositories')
const Response = require('../dto/Response')
const NoResultsError = require('../exceptions/NoResultsError')

const getAllCustomers = async (isSorting) => {
    const result = await customerRepo.getAllCustomers()
    if (result.Count == 0) {
      throw new NoResultsError("There is no record for this query :getAllCustomers()")
    }
    if (isSorting) {
      const {sortRecord} = require('../utils/commonUtil')
      return new Response(sortRecord(result.Items), result.Count)
    }
    return new Response(result.Items, result.Count)
}

const searchCustomer = async (phoneNumber) => {
  const result = await customerRepo.searchCustomer(phoneNumber)
  if (result.Count == 0) {
    throw new NoResultsError("There is no record for this query :searchCustomer()")
  }
  return new Response(result.Items, result.Count)
}

module.exports = {getAllCustomers, searchCustomer}