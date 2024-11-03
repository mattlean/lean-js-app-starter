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

  if (isProduction) {
    presetEnv[1].browserslistEnv = "production";
  }

  if (isTest) {
    delete presetEnv[1].modules;
  }

  /**
   * Babel plugins:
   * https://babeljs.io/docs/plugins
   */
  const plugins = [];

  return {
    presets: [presetEnv],
    plugins,
  };
};
