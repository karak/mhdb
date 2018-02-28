module.exports = {
  "transform": {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "/__tests__/unit-tests/.*\\.(jsx?|tsx?)$",
  "testPathIgnorePatterns": ["node_modules", "/__tests__/helpers/.*", "<rootDir>/lib/.*"],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
  ],
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 90,
      "statements": 90,
    },
    "src/SearchResult.ts": {
      "statements": 0,
      "lines": 0,
    },
    "src/Work.ts": {
      "statements": 0,
      "lines": 0,
    }
  },
  "mapCoverage": true,
  "globals": {
    "ts-jest": {
      "tsConfigFile": "./tsconfig.test.json"
    }
  }
};

