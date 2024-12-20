const RULES_REACT = {
  "react/jsx-filename-extension": "error",
};

const CONFIG_REACT = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: RULES_REACT,
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
    /* Preload Source */
    {
      env: {
        browser: true,
        es2024: true,
        node: true,
      },
      files: ["src/preload/**/*.js?(x)"],
      ...CONFIG_REACT,
    },

    /* Renderer Source */
    {
      env: {
        browser: true,
        es2024: true,
      },
      files: ["src/renderer/**/*.js?(x)"],
      ...CONFIG_REACT,
    },

    /* Jest */
    {
      env: {
        es2024: true,
        jest: true,
        node: true,
      },
      files: [
        "src/**/__mocks__/**/*.js?(x)",
        "src/**/__tests__/**/*.js?(x)",
        "src/**/?(*.)+(spec|test).js?(x)",
        "src/renderer/msw/**/*.js",
      ],
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jest/recommended",
        "prettier",
      ],
      rules: RULES_REACT,
    },

    /* Playwright */
    {
      env: {
        browser: true,
        es2024: true,
        node: true,
      },
      files: "src/playwright/**/*.js",
      extends: [
        "eslint:recommended",
        "plugin:playwright/recommended",
        "prettier",
      ],
    },
  ],
  settings: {
    react: {
      version: "18.2",
    },
  },
};
