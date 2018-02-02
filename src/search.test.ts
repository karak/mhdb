import search from './search';

describe('search', () => {
  describe.skip('Production server', () => {
    // The REAL server.
    // Assume it isn't down.
    it('returns first items', async () => {
      const result = await search({ kigo: '桜' });

      expect(result.items).toContainEqual({
        id: '31191',
        body: '「アンタレスの食」てふ過ぎて夜の桜',
        author: '横山房子',
      });

      expect(result.moreItems).toBeDefined();
    });

    it('returns 2nd items incrementally', async () => {
      const firstResult = await search({ kigo: '桜' });

      expect(firstResult.moreItems).toBeDefined();

      const secondResult = await firstResult.moreItems!();

      expect(secondResult.items).toContainEqual({
        id: '1127',
        body: 'したたかに水をうちたる夕ざくら',
        author: '久保田万太郎',
      });
    });

    it('returns last items incrementally', async () => {
      let result = await search({ kigo: '桜' });

      for (let i = 0; i < 8; i += 1) {
        expect(result.moreItems).toBeDefined();

        result = await result.moreItems!();
      }

      expect(result.moreItems).toBeUndefined();

      expect(result.items).toContainEqual({
        id: '34237',
        body: '齢とは桜の下の広さかな',
        author: '水口圭子',
      });
    });
  });
});
