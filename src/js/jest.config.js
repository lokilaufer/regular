module.exports = {
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
      functions: 100,
      branches: 100,
    },
  },
  collectCoverageFrom: [
    'src/js/**/*.js',
    '!src/js/**/__tests__/**',
  ],
  testMatch: [
    '**/__tests__/**/*.test.js',
  ],
};
