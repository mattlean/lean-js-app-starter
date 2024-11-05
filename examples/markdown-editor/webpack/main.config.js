const { merge } = require("webpack-merge");

const commonConfig = require("./main.common");

module.exports = (env, { mode }) => {
  switch (mode) {
    case "production": {
      return merge(commonConfig, require("./main.production"));
    }

    case "development": {
      return merge(commonConfig, require("./main.development"));
    }

    default:
      throw new Error(`Unknown mode encountered: ${mode}`);
  }
};
