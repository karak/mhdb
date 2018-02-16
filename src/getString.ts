import './polyfill/fetch';

/**
 * Publish 'GET' Request to the specified URL
 * @param url target URL
 * @returns text content of response
 */
export default function getString(url: string): Promise<string> {
  return fetch(url, { method: 'get' })
    .then((response: Response) => {
      return response.text();
    });
}
