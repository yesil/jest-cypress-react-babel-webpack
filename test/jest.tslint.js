const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  displayName: 'tslint',
  runner: 'jest-runner-tslint',
  testMatch: ['<rootDir>/**/*.tsx?'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/', '/other/'],
}
