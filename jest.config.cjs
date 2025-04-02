// jest.config.cjs (CommonJS format)
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/e2e/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: false,
      tsconfig: 'tsconfig.json'
    }
  }
};