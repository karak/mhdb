jest.mock('../../../src/api/SearchClient');
import search, { IncrementalResult } from '../../../src/api/search';
import Work from '../../../src/api/Work';
import SearchResult from '../../../src/api/SearchResult';
import SearchClient from '../../../src/api/SearchClient';

describe('search', () => {
  const mockSearchWorks: jest.MockInstance<Promise<IncrementalResult<Work>>> =
    (SearchClient.prototype.searchWorks as any);

  beforeEach(() => {
    mockSearchWorks.mockClear();
  });

  it('get all the items by one query', async () => {
    mockSearchWorks.mockImplementation(() => {
      return new Promise<SearchResult<Work>>(resolve => resolve({
        items: [{ id: '1' }, { id: '2' }] as any,
        hasNext: false,
        totalCount: 2,
      }));
    });

    const result = await search({ kigo: '' });

    expect(mockSearchWorks).toHaveBeenCalledWith({ kigo: '' });
    expect(result).toHaveProperty('items', [{ id: '1' }, { id: '2' }]);
    expect(result).toHaveProperty('moreItems', undefined);
  });

  it('get all the items by two queries', async () => {
    mockSearchWorks.mockImplementationOnce(() => {
      return new Promise<SearchResult<Work>>(resolve => resolve({
        items: [{ id: '1' }] as any,
        totalCount: 2,
        hasNext: true,
      }));
    });

    const result = await search({ kigo: '' });

    expect(mockSearchWorks).toHaveBeenCalledWith({ kigo: '' });
    expect(result).toHaveProperty('items', [{ id: '1' }]);
    expect(result).toHaveProperty('moreItems');

    mockSearchWorks.mockImplementationOnce(() => {
      return new Promise<SearchResult<Work>>(resolve => resolve({
        items: [{ id: '2' }] as any,
        totalCount: 2,
        hasNext: false,
      }));
    });

    const result2nd = await result.moreItems!();

    expect(mockSearchWorks).toHaveBeenCalledWith({ kigo: '', page: 1 });
    expect(result2nd).toHaveProperty('items', [{ id: '2' }]);
    expect(result2nd).toHaveProperty('moreItems', undefined);
  });
});
