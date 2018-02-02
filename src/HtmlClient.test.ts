import HtmlClient from './HtmlClient';

describe('HtmlClient', () => {
  describe.skip('Production server', () => {
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
      });
    });
  });
});

function rangePart(html: string) {
  return html.slice(html.lastIndexOf('検索結果'));
}
