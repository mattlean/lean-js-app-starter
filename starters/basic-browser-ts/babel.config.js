module.exports = (api) => {
  const isProduction = api.env("production");
  const isTest = api.env("test");

  api.cache.using(() => {
    if (isProduction) {
      return "production";
    } else if (isTest) {
      return "test";
    } else {
      return "development";
    }
  });

  /**
   * Configuration for preset-env:
   * https://babeljs.io/docs/babel-preset-env
   */
  const presetEnv = [
    "@babel/preset-env",
    { browserslistEnv: "development", modules: false },
  ];

  /**
   * Configuration for preset-typescript:
   * https://babeljs.io/docs/babel-preset-typescript
   */
  const presetTs = "@babel/preset-typescript";

  /**
   * Babel plugins:
   * https://babeljs.io/docs/plugins
   */
  const plugins = [];

  if (isProduction) {
    presetEnv[1].browserslistEnv = "production";
  }

  return {
    presets: [presetEnv, presetTs],
    plugins,
  };
};
