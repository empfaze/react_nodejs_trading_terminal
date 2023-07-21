const path = require('path');

const resolvePath = (fileName) =>
  path.resolve(__dirname, '__mocks__', fileName);

module.exports = {
  testTimeout: 20000,
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^.+\\.(css)$': resolvePath('style.js'),
  },
};
