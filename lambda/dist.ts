import 'source-map-support/register';
import * as fs from 'fs';
import * as path from 'path';

const mime: { [ext: string]: string } = {
  html: 'text/html',
  js: 'text/javascript',
};

interface Event {
  path: string;
}

exports.handler = (
  event: Event,
  context: any,
  callback: (err: any, data: any) => void,
) => {
  const subpath = event.path;
  const contentType = mime[path.extname(subpath)];
  const staticFilePath = path.join(__dirname, '..', subpath);

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
