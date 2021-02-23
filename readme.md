## Readme...

```javascript
npm install @deepcrawl/branded-jest-html-reporter
```

then in `jest.config.js`:

```javascript
reporters: [
    "default",
    [
      "@deepcrawl/branded-jest-html-reporter",
      {
        projectName: "@deepcrawl/branded-jest-html-reporter",
        projectDescription: "A DeepCrawl branded Jest Html Reporter",
        repositoryUrl: "https://github.com/deepcrawl/branded-jest-html-reporter",
      },
    ],
  ],
```
