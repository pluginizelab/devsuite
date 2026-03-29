const nextJest = require("next/jest").default;

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  roots: ["<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
  modulePathIgnorePatterns: ["<rootDir>/build"],
  testMatch: ["**/__tests__/**/*.+(js|jsx)", "**/?(*.)+(spec|test).+(js|jsx)"],
};

module.exports = createJestConfig(customJestConfig);
