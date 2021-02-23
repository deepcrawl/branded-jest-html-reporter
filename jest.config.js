module.exports = {
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  reporters: [
    "default",
    [
      "<rootDir>/dist/index.js",
      {
        projectName: "@deepcrawl/branded-jest-html-reporter",
        projectDescription: "A DeepCrawl branded Jest Html Reporter",
        repositoryUrl: "https://github.com/deepcrawl/branded-jest-html-reporter",
      },
    ],
  ],
};
