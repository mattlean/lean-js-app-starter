module.exports = (api) => {
  const isDevelopment = api.env("development");
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
  const presetEnv = ["@babel/preset-env", { modules: false }];

  if (isTest) {
    delete presetEnv[1].modules;
  }

  /**
   * Configuration for preset-react:
   * https://babeljs.io/docs/babel-preset-react
   */
  const presetReact = [
    "@babel/preset-react",
    { development: true, runtime: "automatic" },
  ];

  if (isProduction) {
    delete presetReact[1].development;
  }

  /**
   * Babel plugins:
   * https://babeljs.io/docs/plugins
   */
  const plugins = [];

  if (isDevelopment) {
    plugins.push(require.resolve("react-refresh/babel"));
  }

  return {
    presets: [presetEnv, presetReact],
    plugins,
  };
};
