const path = require("path");

module.exports = {
  env: {
    commonjs: true,
    node: true,
  },
  extends: ["deepcrawl"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: [
        "**/*.test.ts",
        "**/*.testing.ts",
        "**/*.mock.ts",
        "**/*.test-util.ts",
        "**/*.test-hook.ts",
      ],
      rules: {
        "node/no-unpublished-import": "off",
        "max-lines-per-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-console": "warn",
        "no-loops/no-loops": "warn",
      },
    },
    {
      files: ["**/*.test.ts", "**/*.testing.ts"],
      rules: {
        "sonarjs/no-duplicate-string": "off",
      },
    },
    {
      files: ["**/*.test-hook.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["**/*.ts"],
      rules: {
        "@typescript-eslint/require-await": "off",
      },
    },
  ],
};
