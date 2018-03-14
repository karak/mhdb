import 'source-map-support/register';
import search from '../src/api/search';

export const handler = (
  event: any,
  context: any,
  callback: (err: any, data: any) => void,
) => {
  const query = event.queryStringParameters;

  search(query)
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result),
      };
      callback(null, response);
    })
    .catch((err: NodeJS.ErrnoException) => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({ errorMessage: err.message }),
      };
      callback(null, response);
    });
};
