import HtmlClient from '../../../src/api/HtmlClient';

describe('HtmlClient', () => {
  jest.setTimeout(10 * 1000);

  describe('Production server', () => {
    // The REAL server.
    // Assume it isn't down.
    const client = new HtmlClient('www.haiku-data.jp');
    describe('SearchWorks', () => {
      describe('by kigo', () => {
        it('retrieves 1st HTML', async () => {
          const html = await client.searchWorks({ kigo: '桜' });
          expect(html).toMatch(/「アンタレスの食」てふ過ぎて夜の桜/);
          expect(rangePart(html)).toMatch(/1件～50件/);
        });

        it('retrieves 2nd HTML', async () => {
          const html = await client.searchWorks({ kigo: '桜', page: 1 });
          expect(html).toMatch(/さくら咲けさくら咲くあゝ桜かな/);
          expect(rangePart(html)).toMatch(/51件～100件/);
        });

        it('retrieves nothing', async () => {
          const html = await client.searchWorks({ kigo: '昼の秋' });
          expect(html).toMatch(/該当する俳句は見つかりませんでした/);
        });
      });

      describe('by author(surname or penname)', () => {
        it ('retrieve works by Basyo', async () => {
          const html = await client.searchWorks({ author: '芭蕉' });
          expect(html).toMatch(/古池や蛙飛びこむ水の音/);
        });
      });

      describe('by kigo and author(surname or penname)', () => {
        it ('retrieve works by Basyo', async () => {
          const html = await client.searchWorks({ kigo: '枯野', author: '芭蕉' });
          expect(html).not.toMatch(/古池や蛙飛びこむ水の音/);
          expect(html).toMatch(/旅に病で夢は枯野をかけ廻る/);
        });
      });

      describe('by first5(whole)', async () => {
        it ('retrieve works that starts with "hirahira-to"', async () => {
          const html = await client.searchWorks({ first5: 'ひらひらと' });
          expect(html).toMatch(/ひらひらと月光降りぬ貝割菜/);
        });
      });

      describe('by last5(whole)', async () => {
        it ('retrieve works that ends with "ari-nu-beshi"', async () => {
          const html = await client.searchWorks({ last5: 'ありぬべし' });
          expect(html).toMatch(/鶏頭の十四五本もありぬべし/);
        });
      });

      describe('by keyword', async () => {
        it ('retrieve works with keyword "thunder"', async () => {
          const html = await client.searchWorks({ keyword: '雷' });
          expect(html).toMatch(/あえかなる薔薇撰りをれば春の雷/);
          expect(html).toMatch(/クリスマス地雷一億地に殘し/);
          expect(html).toMatch(/杉本雷造/);
        });
      });
    });
  });
});

function rangePart(html: string) {
  return html.slice(html.lastIndexOf('検索結果'));
}
