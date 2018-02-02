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

  it('parse pagenated HTML 1/3.', () => {
    expectFileToBeReadAs('simple-result1-1.html', {
      items: [{
        id: '1',
        body: 'work1',
        author: 'author1',
      }],
      totalCount: 3,
      hasNext: true,
    });
  });

  it('parse pagenated HTML 2/3.', () => {
    expectFileToBeReadAs('simple-result1-2.html', {
      items: [{
        id: '2',
        body: 'work2',
        author: 'author2',
      }],
      totalCount: 3,
      hasNext: true,
    });
  });

  it('parse pagenated HTML 3/3.', () => {
    expectFileToBeReadAs('simple-result1-3.html', {
      items: [{
        id: '3',
        body: 'work3',
        author: 'author3',
      }],
      totalCount: 3,
      hasNext: false,
    });
  });
  it('parse "NOT FOUND" html.', () => {
    expectFileToBeReadAs('not-found.html', {
      items: [],
      totalCount: 0,
      hasNext: false,
    });
  });

  describe('Against real results', () => {
    it('parses single HTML', () => {
      const result = parseTestFile('search-result1.html');
      expect(result.items).toContainEqual({
        id: '31559',
        body: '骨はかく崩るるならむ霜柱',
        author: '松林尚志',
      });
      expect(result.hasNext).toBe(false);
      expect(result.totalCount).toBe(28);
    });

    it('parses pagenated HTML 1/2', () => {
      const result = parseTestFile('search-result2-1.html');
      expect(result.items).toContainEqual({
        id: '28841',
        body: '物言えば耳に聞こえて秋の暮',
        author: '和田悟朗',
      });
      expect(result.hasNext).toBe(false);
      expect(result.totalCount).toBe(94);
    });

    it('parses HTML with no items', () => {
      const result = parseTestFile('search-result2-2.html');
      expect(result.items).toEqual([]);
      expect(result.hasNext).toBe(false);
      expect(result.totalCount).toBe(0);
    });
  });

  it('parses HTML of test case 1', () => {
    const result = parseTestFile('test-case1.html');
    expect(result.items).toContainEqual({
      id: '31191',
      body: '「アンタレスの食」てふ過ぎて夜の桜',
      author: '横山房子',
    });
    expect(result.hasNext).toBe(true);
    expect(result.totalCount).toBe(449);
  });
});
