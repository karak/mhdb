import HtmlSquraper from './HtmlSquraper';
import SearchResult from './SearchResult';
import Work from './Work';
import * as fs from 'fs';
import * as path from 'path';

describe('HtmlSquraper', () => {
  it('parse simple HTML.', () => {
    const html = fs.readFileSync(path.join(__dirname, '../test-data/simple-result.html'), 'utf-8');
    const squraper = new HtmlSquraper();

    const result = squraper.parseWorks(html);

    const expected: SearchResult<Work> = {
      items: [{
        id: '1',
        body: 'work1',
        author: 'author1',
      }, {
        id: '2',
        body: 'work2',
        author: 'author2',
      }],
      totalCount: 2,
      hasNext: false,
    };

    expect(result).toEqual(expected);
  });
});
