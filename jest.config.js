module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '/test(/(integration|unit))?/.*\\.test\\.ts$',
};
