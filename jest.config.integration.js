module.exports = Object.assign(
  {},
  require('./jest.config'),
  {
    testRegex: '/__tests__/integration-tests/.*\\.(jsx?|tsx?)$',
  }
);
