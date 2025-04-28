module.exports = {
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/app/$1", 
    },
  };
  
  
  