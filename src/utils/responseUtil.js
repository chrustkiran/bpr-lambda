const returnSuccessResponse = (res) => {
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

const returnCreatedResponse = (res) => {
  return {
    statusCode: 201,
    body: JSON.stringify(res),
  };
};

const returnAcceptedResponse = (res = undefined) => {
  if (!res) return { statusCode: 204 };
  return {
    statusCode: 204,
    body: JSON.stringify(res),
  };
};

module.exports = { returnSuccessResponse, returnCreatedResponse, returnAcceptedResponse };
