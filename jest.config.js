module.exports = {
  preset: 'react-native',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/index.{js,ts}',
      '!src/**/styles.{js,ts}',
      '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text'],
};
