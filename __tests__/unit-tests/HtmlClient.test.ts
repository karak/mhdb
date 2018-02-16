jest.mock('../../src/getString');
import * as url from 'url';
import * as qs from 'querystring';
import getString from '../../src/getString';
import HtmlClient from '../../src/HtmlClient';

describe('HtmlClient', () => {
  const HOST = 'localhost/nowhere';
  const client = new HtmlClient(HOST);
  const spy = getString as any as jest.MockInstance<Promise<string>>;

  describe('searchWorks', () => {
    it('search by kigo', async () => {
      await client.searchWorks({ kigo: 'April' });

      expect(spy).toHaveBeenCalledTimes(1);
      const queryParams = getQueryParams(spy.mock.calls[0][0]);
      expect(queryParams['kigo']).toBe('April');
    });

    it('search by author', async () => {
      await client.searchWorks({ author: 'Basho Matsuo' });

      expect(spy).toHaveBeenCalledTimes(1);
      const queryParams = getQueryParams(spy.mock.calls[0][0]);
      expect(queryParams['author_name']).toBe('Basho Matsuo');
    });

    it('search by first5', async () => {
      await client.searchWorks({ first5: 'ABCDE' });

      expect(spy).toHaveBeenCalledTimes(1);
      const queryParams = getQueryParams(spy.mock.calls[0][0]);
      expect(queryParams['first5']).toBe('ABCDE');
    });

    it('search by last5', async () => {
      await client.searchWorks({ last5: 'VWXYZ' });

      expect(spy).toHaveBeenCalledTimes(1);
      const queryParams = getQueryParams(spy.mock.calls[0][0]);
      expect(queryParams['last5']).toBe('VWXYZ');
    });

    it('search by keyword', async () => {
      await client.searchWorks({ keyword: 'flower' });

      expect(spy).toHaveBeenCalledTimes(1);
      const queryParams = getQueryParams(spy.mock.calls[0][0]);
      expect(queryParams['keyword']).toBe('flower');
    });

    describe('page', () => {
      it('search without page', async () => {
        await client.searchWorks({});

        expect(spy).toHaveBeenCalledTimes(1);
        const queryParams = getQueryParams(spy.mock.calls[0][0]);
        expect(queryParams['submit_and']).toBeDefined();
      });

      it('search with page 0', async () => {
        await client.searchWorks({ page: 0 });

        expect(spy).toHaveBeenCalledTimes(1);
        const queryParams = getQueryParams(spy.mock.calls[0][0]);
        expect(queryParams['submit_and']).toBeDefined();
      });

      it('search with page', async () => {
        await client.searchWorks({ page: 1 });

        expect(spy).toHaveBeenCalledTimes(1);
        const queryParams = getQueryParams(spy.mock.calls[0][0]);
        expect(queryParams['submit_and']).not.toBeDefined();
        expect(queryParams['search_type']).toBe('and');
        expect(queryParams['next_i']).toBe('1');
      });
    });
  });

  beforeEach(() => {
    spy.mockReset();

    jest.resetAllMocks();
  });
});

function getQueryParams(urlString: string) {
  return qs.parse(url.parse(urlString).query!);
}
