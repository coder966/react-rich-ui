export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.css$': 'jest-transform-css',
  },
  modulePathIgnorePatterns: ['__utils__'],
};
