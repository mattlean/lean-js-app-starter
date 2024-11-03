const { merge } = require("webpack-merge");

const commonConfig = require("./preload.common");

module.exports = (env, { mode }) => {
  switch (mode) {
    case "production": {
      return merge(commonConfig, require("./preload.production"));
    }

    case "development": {
      return merge(commonConfig, require("./preload.development"));
    }

    default:
      throw new Error(`Unknown mode encountered: ${mode}`);
  }
};
