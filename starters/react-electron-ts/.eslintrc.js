const RULES_REACT = {
  "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
};

const CONFIG_REACT_TS = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
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
    /* Source */
    {
      files: ["src/**/*.[jt]s"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
    },

    /* Preload Source */
    {
      env: {
        browser: true,
        es2024: true,
        node: true,
      },
      files: ["src/preload/**/*.[jt]s?(x)"],
      ...CONFIG_REACT_TS,
    },

    /* Renderer Source */
    {
      env: {
        browser: true,
        es2024: true,
      },
      files: ["src/renderer/**/*.[jt]s?(x)"],
      ...CONFIG_REACT_TS,
    },

    /* Main Source */
    {
      files: ["src/main/**/*.[jt]s"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
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
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: RULES_REACT,
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
  settings: {
    react: {
      version: "18.2",
    },
  },
};
