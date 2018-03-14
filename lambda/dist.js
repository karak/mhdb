const fs = require('fs');
const path = require('path');

const mime = {
  'html': 'text/html',
  'js': 'text/javascript',
};

exports.handler = (event, context, callback) => {
  const subpath = event.path;
  const contentType = mime[path.extname(subpath)];
  const staticFilePath = path.join(__dirname , '..', subpath);

  fs.readFile(staticFilePath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': contentType,
        },
        body: data,
      };

      callback(null, response);
    } else {
      const response = {
        statusCode: 404,
      };
      callback(null, response);
    }
  });
};
