/** @type {import('jest').Config} */
const config = {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/__tests__/*.test.jsx'],
  // The paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setup.js',
    '<rootDir>/src/test/mocks.js',
  ],
}

export default config
