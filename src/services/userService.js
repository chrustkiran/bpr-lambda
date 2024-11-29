const userRepo = require('../repositories/userRepositories')
const Response = require('../dto/Response')

const getAllUsers = async (event) => {
  try {
    const result = await userRepo.getAllUsers()
    if (result.Count == 0) {
      throw new NoResultsError("There is no record for this query :getAllUsers()", 400)
    }
    return new Response(result.Items, result.Count)
  } catch (error) {
    console.error('There was an error while getting all user records', error)
    throw error
  }
}

module.exports = {getAllUsers}