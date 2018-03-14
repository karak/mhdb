
exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/json',
    },
    body: JSON.stringify({ errorCode: -1, errorMessage: 'Search API is NOT implemented yet.' }),
  };
  callback(null, response);
};
