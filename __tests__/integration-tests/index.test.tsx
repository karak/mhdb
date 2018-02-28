describe('index', () => {
  let div: HTMLDivElement;

  beforeAll(() => {
    div = document.createElement('div');
    div.id = 'app';
    document.documentElement.appendChild(div);
  });

  afterAll(() => {
    document.documentElement.removeChild(div);
  });

  it('does NOT crash', () => {
    expect(() => require('../../src/index')).not.toThrow();
  });
});
