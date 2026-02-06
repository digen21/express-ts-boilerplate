module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  moduleNameMapper: {
    "^@middlewares$": "<rootDir>/src/middlewares",
    "^@controllers$": "<rootDir>/src/controller",
    "^@routes$": "<rootDir>/src/routes",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@utils$": "<rootDir>/src/utils",
    "^@types$": "<rootDir>/src/types",
    "^@config$": "<rootDir>/src/config",
    "^@validators$": "<rootDir>/src/validators",
  },
};
