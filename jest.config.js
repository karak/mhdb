module.exports = {
  "transform": {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "/__tests__/unit-tests/.*\\.(jsx?|tsx?)$",
  "testPathIgnorePatterns": ["node_modules", "/__tests__/helpers/.*"],
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
  ]
};

