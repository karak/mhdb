import 'source-map-support/register';

export const handler = (
  event: any,
  context: any,
  callback: (err: any, data: any) => void,
) => {
  const response = {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/json',
    },
    body: JSON.stringify({
      errorCode: -1,
      errorMessage: 'Search API is NOT implemented yet.',
    }),
  };
  callback(null, response);
};
