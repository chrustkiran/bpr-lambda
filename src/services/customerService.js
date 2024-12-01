const customerRepo = require('../repositories/customerRepositories')
const Response = require('../dto/Response')
const NoResultsError = require('../exceptions/NoResultsError')
const { randomUUID } = require('crypto')

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

const createCustomers = async (customers) => {
    const customersModified = customers.map(customer => ({...customer, 'CustomerID': randomUUID()}))
    const errors = []
    const added = []
    for(const customer of customersModified) {
      try {
        await customerRepo.addCustomers(customer)
        added.push(customer)
      } catch (error) {
        errors.push({error: error, customer: customer})
      }
    }
    if (errors.length > 0) {
      console.error('Error adding customers', errors)
    }
    if (errors.length == customers.length) {
      throw new Error('Error adding all the customers')
    }
    return {created: added, errored: errors}; 
}

const getCustomerByCustomerId = async (customerId) => {
  const customer = await customerRepo.getCustomerByCustomerId(customerId);
  if (customer.Count == 0) {
    throw new NoResultsError("There is no record for this query :getCustomerByCustomerId()")
  }
  return new Response(customer.Items, customer.Count) 
}

module.exports = {getAllCustomers, searchCustomer, createCustomers, getCustomerByCustomerId}