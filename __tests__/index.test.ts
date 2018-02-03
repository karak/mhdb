import search from '../src/search';
import * as mhdb from '../src/index';

describe('index', () => {
  it('has a member of search', () => {
    expect(search).toBe(mhdb.search);
  });
});
