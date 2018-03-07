import '../../src/polyfill/raf';
import App from '../../src/containers/App';

jest.mock('../../src/containers/App');

describe('index', () => {
  let div: HTMLDivElement;
  const mockApp = (App as any) as jest.MockInstance<typeof App>;

  beforeEach(() => {
    mockApp.mockClear();

    div = document.createElement('div');
    div.id = 'app';
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('renders to #app', async () => {
    require('../../src/index');

    expect(mockApp).toHaveBeenCalled();
  });
});
