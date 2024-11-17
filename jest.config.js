module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__tests__/**/*-test.[jt]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
    "!**/jest.config.js",
    "!**/.eslintrc.js",
    "!**/constants/**",
    "!**/scripts/**",
    "!**/types/**",
    "!**/backend/**",
  ],
};
