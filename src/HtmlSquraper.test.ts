import HtmlSquraper from './HtmlSquraper';
import SearchResult from './SearchResult';
import Work from './Work';
import * as fs from 'fs';
import * as path from 'path';


describe('HtmlSquraper', () => {
  const squraper = new HtmlSquraper();
  function parseTestFile(fileName: string) {
    const html = fs.readFileSync(path.join(__dirname, '../test-data', fileName), 'utf-8');
    const result = squraper.parseWorks(html);
    return result;
  }

  function expectFileToBeReadAs(testFile: string, expected: SearchResult<Work>) {
    expect(parseTestFile(testFile)).toEqual(expected);
  }

  it('parse simple HTML.', () => {
    expectFileToBeReadAs('simple-result.html', {
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
    });
  });
});
