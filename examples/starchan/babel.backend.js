module.exports = (api) => {
  const isProduction = api.env("production");

  /**
   * Configuration for preset-env:
   * https://babeljs.io/docs/babel-preset-env
   */
  const presetEnv = [
    "@babel/preset-env",
    { browserslistEnv: "backend", modules: false },
  ];

  /**
   * Configuration for preset-react:
   * https://babeljs.io/docs/babel-preset-react
   */
  const presetReact = [
    "@babel/preset-react",
    {
      development: true,
      runtime: "automatic",
    },
  ];

  if (isProduction) {
    delete presetReact[1].development;
  }

  /**
   * Configuration for preset-typescript:
   * https://babeljs.io/docs/babel-preset-typescript
   */
  const presetTs = "@babel/preset-typescript";

  return {
    presets: [presetEnv, presetReact, presetTs],
  };
};
