import getString from '../../../src/api/getString';

describe('getString', () => {
  it('can fetch html from "example.com"', async () => {
    try {
      const html = await getString('https://example.com');
      expect(html).toMatch(/<html>.*?<\/html>/);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
