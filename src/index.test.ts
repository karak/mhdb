import search from './search';
import * as mhdb from './index';

describe('index', () => {
  it('has a member of search', () => {
    expect(search).toBe(mhdb.search);
  });
});
