const CONFIG_TS = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};

module.exports = {
  env: {
    es2024: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  root: true,
  rules: {},
  overrides: [
    /* Source */
    {
      files: ["src/**/*.[jt]s"],
      ...CONFIG_TS,
    },

    /* Preload Source */
    {
      env: {
        browser: true,
        es2024: true,
        node: true,
      },
      files: ["src/preload/**/*.[jt]s?(x)"],
      ...CONFIG_TS,
    },

    /* Renderer Source */
    {
      env: {
        browser: true,
        es2024: true,
      },
      files: ["src/renderer/**/*.[jt]s?(x)"],
      ...CONFIG_TS,
    },

    /* Main Source */
    {
      files: ["src/main/**/*.[jt]s"],
      ...CONFIG_TS,
    },

    /* Jest */
    {
      env: {
        es2024: true,
        jest: true,
        node: true,
      },
      files: [
        "src/**/__mocks__/**/*.[jt]s?(x)",
        "src/**/__tests__/**/*.[jt]s?(x)",
        "src/**/?(*.)+(spec|test).[jt]s?(x)",
        "src/renderer/msw/**/*.[jt]s",
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
    },

    /* Playwright */
    {
      env: {
        browser: true,
        es2024: true,
        node: true,
      },
      files: "src/playwright/**/*.[jt]s",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:playwright/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
    },
  ],
};
