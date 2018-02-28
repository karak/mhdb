jest.mock('../../../src/api/HtmlClient');
jest.mock('../../../src/api/HtmlSquraper');
import SearchClient from '../../../src/api/SearchClient';
import HtmlClient from '../../../src/api/HtmlClient';
import HtmlSquraper from '../../../src/api/HtmlSquraper';

describe('SearchClient', () => {
  const searchClient = new SearchClient('https://stub.nowhere');
  const mockSearchWorks = jest.fn<Promise<string>>();
  const html = `
  <html>
    <body>
    </body>
  </html>`;
  const work = {};

  jest
    .spyOn(HtmlClient.prototype, 'searchWorks')
    .mockReturnValue(new Promise(resolve => resolve(html)));
  jest.spyOn(HtmlSquraper.prototype, 'parseWorks').mockReturnValueOnce(work);

  beforeEach(() => {
    jest.resetModules();
  });

  it('should chain 2 methods.', async () => {
    const result = await searchClient.searchWorks({ kigo: '' });
    expect(result).toBe(work);
  });
});
